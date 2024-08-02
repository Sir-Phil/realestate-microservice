import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { authBearerToken } from '../../util/requests';
import { userIdToken } from '../../util/users';
import Enquiry from '../../models/enquiry';

/**
 * Delete an enquiry.
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = authBearerToken(req);
  const user_id = userIdToken(token);
  
  try {
    const enquiry = await Enquiry.findOne({ enquiry_id: id });
    if (!enquiry) {
      res.status(404).send({ message: 'Enquiry not found' });
      return ;
    }

    if (enquiry.users.from.user_id !== user_id && enquiry.users.to.user_id !== user_id) {
       res.status(403).send({ message: 'Not allowed' });
       return;
    }

    if (enquiry.users.from.user_id === user_id) {
      enquiry.users.from.keep = false;
    }
    if (enquiry.users.to.user_id === user_id) {
      enquiry.users.to.keep = false;
    }

    if (!enquiry.users.from.keep && !enquiry.users.to.keep) {
      await enquiry.deleteOne();
    } else {
      await enquiry.save();
    }

    res.status(200).send({ data: enquiry });
  } catch (error) {
    res.status(400).send({ message: 'Failed to delete enquiry', error: (error as Error).message });
  }
});

export default deleteEnquiry;
