import express from 'express';
import authUser from '../middleware/authUser.js';
import { uploadVideo, getAllVideos, getVideoById, getAllVideosByUploader, updateVideoByUploader, deleteVideoByUploader } from '../controllers/videos.controller.js';

const videoRouter = express.Router();

// Video routes
videoRouter.post('/upload', authUser, uploadVideo);
videoRouter.get('/all', getAllVideos);
videoRouter.get('/:id', getVideoById);
videoRouter.get('/uploader/:uploaderId', getAllVideosByUploader);
videoRouter.put('/:id', updateVideoByUploader);
videoRouter.delete('/:id', deleteVideoByUploader);

export default videoRouter;
