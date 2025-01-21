import express from "express";
import { createPropertyOpts, deleteImagesOpts, deletePropertyOpts, getPropertiesOpts, getPropertyOpts, updatePropertyOpts, uploadImagesOpts } from "./options";
import { addImagesProperty, createProperty, deleteImageProperty, deleteProperty, getProperties, getProperty, updateProperty } from "../../controller/properties";


const propertyRouter = express.Router();

propertyRouter.get("/", getPropertiesOpts(getProperties));
// propertyRouter.get("/:id", getPropertyOpts(getProperty));
propertyRouter.post("/", createPropertyOpts(createProperty));
propertyRouter.patch("/:id", updatePropertyOpts(updateProperty));
propertyRouter.delete("/:id", deletePropertyOpts(deleteProperty));
propertyRouter.post("/upload/images/:id", uploadImagesOpts(addImagesProperty));
propertyRouter.delete("/upload/images/:id", deleteImagesOpts(deleteImageProperty));


export default propertyRouter;