import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import multer from 'multer'
import { WebSocketServer } from 'ws';


//Local Files
import { createServer } from 'http';
import { setStatic } from './static';
import { setCors } from './cors';
import { setExpressRoute } from './routes';
import { setSwaggerDocs } from './setSwagger';
import { setWebSocket } from './websocket';



dotenv.config();

export const app = express()

//Middleware to parse multer form data
const upload = multer()
app.use(upload.any())

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({extended: true}));

//Middleware to handle authentication 
// app.use((req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers['authorization'];
//     if(!token) return res.sendStatus(401);
//     Jwt.verify(token as string, process.env.SECRET_KEY || 'secret', (err, user) => {
//         if(err)return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// });

// Middleware to log requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// app.use((req: Request, res: Response, next: NextFunction) => {
//     try {
//       const token = authBearerToken(req);
//       Jwt.verify(token, process.env.SECRET_KEY || 'secret', (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//       });
//     } catch (err) {
//       res.sendStatus(401);
//     }
//   });

//Middle for hashing passwords
const saltWorkFactor = Number(process.env.SALT) || 12;
app.use((req: Request, res: Response, next: NextFunction) => {
    req.bcrypt = bcrypt;
    req.saltWorkFactor = saltWorkFactor;
    next();
});

// register the route 
setExpressRoute(app);

// Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Generate API documentation 
setSwaggerDocs(app);

// Server static files -ex uploads/
setStatic(app);

//Enable CORSs
setCors(app);

//Set up websocket server 
const server = createServer(app);

const wss = new WebSocketServer({ server })


setWebSocket(wss);

//Connect to mongoDB
mongoose.connect(process.env.DB_CONNECT || '')
.then(() => {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log('Listening on PORT: ' + PORT)
    });
}).catch((e) => console.error(e));

//Type for request
declare global {
    namespace Express{
        interface Request{
            user?: any;
            bcrypt: typeof bcrypt;
            saltWorkFactor: number;
        }
    }
}
