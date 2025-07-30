import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './database/database.js';
import "dotenv/config";
import userRouter from './routes/user.route.js';
import videoRouter from './routes/videos.route.js';
import commentRouter from './routes/comments.route.js';
import channelRouter from './routes/channel.route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/videos', videoRouter);
app.use('/api/comments', commentRouter);
app.use('/api/channel', channelRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});