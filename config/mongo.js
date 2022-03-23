import mongoose from 'mongoose';

export const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_CONNECT)
    .then(() => console.log('db is connected'))
    .catch(error => console.log(error));
};
