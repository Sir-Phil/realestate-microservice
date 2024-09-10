import { Request, Response, NextFunction } from 'express';
import { responseError, responseSuccess } from '../../../util/constants/response';


const uploadImagesOpts = (
  handler: (req: Request, res: Response, next: NextFunction) => void
) => [
  (req: Request, res: Response, next: NextFunction) => {
    // Authentication Middleware (replace this with your actual authentication logic)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json(
        responseError({
          status: 401,
          message: 'No Authorization was found in request.headers',
        })
      );
    }
    next(); // Call next if authentication passes
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
      res.status(201).json(
        responseSuccess({
          status: 201,
          message: 'Files are uploaded.',
          data: req.files || [], // Assuming the files are on `req.files`
        })
      );
    } catch (error: any) {
      res.status(400).json(
        responseError({
          status: 400,
          message: error.message || 'Bad Request',
        })
      );
    }
  },
];


const deleteImagesOpts = (
    handler: (req: Request, res: Response, next: NextFunction) => void
  ) => [
    (req: Request, res: Response, next: NextFunction) => {
      // Authentication Middleware
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json(
          responseError({
            status: 401,
            message: 'No Authorization was found in request.headers',
          })
        );
      }
      next();
    },
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
        res.status(200).json({
          status: 200,
          message: 'Images are deleted.',
          data: [], // You can replace this with actual deleted image data.
        });
      } catch (error: any) {
        res.status(400).json(
          responseError({
            status: 400,
            message: error.message || 'Bad Request',
          })
        );
      }
    },
  ];
  
export {
    uploadImagesOpts,
    deleteImagesOpts,
}




