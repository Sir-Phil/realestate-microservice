import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';
import Enquiry from '../../models/enquiry';
import { v4 as uuidV4 } from 'uuid';
import { sendTargetedNotification } from '../../websocket';
import { EnquiryNotification } from '../../enum/enquiries';

/**
 * Create an enquiry.
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
const createEnquiry = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, topic, email, userTo, property } = req.body;
  if (!title || !content || !topic || !email || !userTo) {
    res.status(400).send({
      message: 'Some fields are missing!',
    });
  }

  const token = authBearerToken(req);
  const userFrom = userIdToken(token);

  if (userFrom === userTo) {
    res.status(400).send({
      message: 'Not allowed to send enquiry to yourself.',
    });
  }

  const users = {
    from: { user_id: userFrom, keep: true },
    to: { user_id: userTo, keep: true },
  };

  try {
    const newEnquiry = new Enquiry({
      enquiry_id: uuidV4(),
      read: false,
      users,
      property,
      ...req.body,
    });

    await newEnquiry.save();
    res.status(201).send({ data: newEnquiry });
    sendTargetedNotification(EnquiryNotification.new, newEnquiry, userTo);
  } catch (error) {
    res.status(400).send({
      message: 'Failed to create enquiry',
      error: (error as Error).message,
    });
  }
});

export default createEnquiry;
