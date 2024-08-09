import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import Enquiry from '../../models/enquiry';

const getEnquiry = asyncHandler(async(req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const enquiry = await Enquiry.findOne({  enquiry_id: id});
        if(!enquiry){
            res.status(404).send({
                message: "Can't find Enquiry"
            });
        }
        res.status(200).send({ data: enquiry});
        return;
    } catch (error) {
        res.status(400).send(error);
        return;
    }
})

export default getEnquiry;