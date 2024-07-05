import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.ENQUIRY_SERVICE_PORT || 3003;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => console.log('Enquiry Service MongoDB connected'))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Enquiry Service running on port ${port}`);
});
