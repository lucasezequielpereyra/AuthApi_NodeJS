import 'dotenv/config';
import app from './src/app';
import { dbConnect } from './config/mongo';

const PORT = process.env.PORT || 4000;

dbConnect();
app.listen(PORT, () => {
  console.log('Server listen on port', PORT);
});
