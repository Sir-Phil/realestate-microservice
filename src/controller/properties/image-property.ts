import fs from "fs";
import util from "util";
import { Request, Response, NextFunction } from 'express';
import path from "path";
import { pipeline } from "stream";
import Property from "../../models/property.js";
import { authBearerToken } from "../../util/requests.js";
import { userIdToken } from "../../util/users.js";

const pump = util.promisify(pipeline);

// Middleware to check property ownership
 const isPropertyOwner = (property, req:Request, res: Response) => {
  const token = authBearerToken(req);
  const user_id = userIdToken(token);
  if (property.user_id !== user_id) {
    res.status(401).send({ message: "Error: You do not own the property." });
    return false;
  }
  return true;
};

// Add Images to Property
 const addImagesProperty = async (req: Request, res: Response) => {
  const property_id = req.params.id;
  try {
    // Check if property exists
    const property = await Property.findOne({ property_id });
    if (!property) {
      return res.status(404).send({ message: "Error: Property not found." });
    }

    if (!isPropertyOwner(property, req, res)) {
      return; // Exit if user is not the owner
    }

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save uploaded files
    const parts = await req.files();
    for await (const data of parts) {
      const imgName = `${Date.now()}-${data.filename}`;
      await pump(data.file, fs.createWriteStream(path.join(uploadDir, imgName)));

      const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${imgName}`;
      property.images.push(imageUrl);
    }

    await property.save();
    return res.status(201).send({ data: property.images });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "An error occurred while adding images.", error });
  }
};

// Delete Images from Property
const deleteImagesProperty = async (req: Request, res: Response) => {
  const property_id = req.params.id;
  const { images } = req.body;

  try {
    const property = await Property.findOne({ property_id });
    if (!property) {
      return res.status(404).send({ message: "Error: Property not found." });
    }

    if (!isPropertyOwner(property, req, res)) {
      return; // Exit if user is not the owner
    }

    property.images = property.images.filter((img) => !images.includes(img));
    await property.save();

    unlinkImages(images);
    return res.status(200).send({ message: "Images deleted successfully.", data: images });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "An error occurred while deleting images.", error });
  }
};

// Helper to delete images from file system
const unlinkImages = (propertyImages = []) => {
  const uploadDir = path.join(process.cwd(), "uploads");
  const images = propertyImages.map((img) => path.basename(img));

  images.forEach((img) => {
    const filePath = path.join(uploadDir, img);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting ${img}:`, err);
      } else {
        console.log(`Successfully deleted ${img}`);
      }
    });
  });
};


export {
  isPropertyOwner,
  addImagesProperty,
  deleteImagesProperty,
  unlinkImages
}
