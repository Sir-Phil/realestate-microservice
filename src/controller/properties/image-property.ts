import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import fs from "fs";
import util from "util";
import path from "path";
import { pipeline } from "stream";
import { authBearerToken } from "../../util/requests";
import { userIdToken } from "../../util/users";
import Property from '../../models/property';


const press = util.promisify(pipeline);

const isPropertyOwner = function(property, req, res) {
    const token = authBearerToken(req);
    const user_id  = userIdToken(token);
    if (property.user_id !== user_id) {
        res.status(401).send({
            message: "Error: you do not own v m/[lproperty."
        });
    }
}

const addImagesProperty = asyncHandler (async( req: Request, res: Response) => {
    const property_id = req.params.id;
    try {
        // check if property exists
        const property = await Property.findOne({ property_id });
        if(!property) {
            res.status(404).send({
                message: "Error: Can't find property."
            });
        }
        isPropertyOwner(property, req, res);

        // if property do exist save uploaded file
        const parts = await req.files();
        for await (const data of parts) {
            const imgName = new Date().getTime() + "-" + data.filename;
            fs.statSync("uploads/")
            await press(
                data.file,
                fs.createWriteStream(path.join(process.cwd(), "uploads", imgName))
            );
            const image = 
            req.protocol + "://" + req.headers.host + "/uploads" + imgName;
            // Update Property images
            property?.images.push(image);
            await property?.save() // wait for the save operation to complete
        }
        res.status(201).send({ data:  property?.images});
    } catch (error) {
        res.send(error);
    }
});

const deleteImageProperty = asyncHandler( async ( req: Request, res: Response,) => {
    const property_id = req.params.id;
    const {images} = req.body;

    try {
        // Check wether the property exists
        const property = await Property.findOne ({ property_id });
        if(!property) {
            res.status(404).send({
                message: "Error: Can't find Property."
            });
        }
        isPropertyOwner(property, req, res);

        property.images = property.images.filter(
            (img) => !images.include(img)
        );
        property?.save();
        unlinkImages(images)
        res.send({ data: images })
    } catch (error) {
        res.send(error);
    }
});

const unlinkImages = function(propertyImages = [] ) {
    const images = propertyImages.map((img) => {
        const imgSplt = img.split("/");
        return imgSplt[imgSplt.length - 1];

    });

    images.forEach((img) => {
        const __dirname = path.resolve();
        fs.unlink(__dirname + "/uploads/" + img, (err) => {
            if(err) {
                console.log(err);
                return;
            }
            console.log("Successfully deleted " + img);
        });
    });
};

export {
    addImagesProperty,
    deleteImageProperty,
    unlinkImages
}