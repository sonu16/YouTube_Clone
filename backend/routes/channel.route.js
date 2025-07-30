import express from 'express';
import { createChannel, getChannelByOwnerId, getChannelById, updateChannel, deleteChannel } from '../controllers/channel.controller.js';
import authUser from '../middleware/authUser.js';

const channelRouter = express.Router();

channelRouter.post('/create', authUser, createChannel);
channelRouter.get('/owner/:ownerId', getChannelByOwnerId);
channelRouter.get('/:channelId', getChannelById);
channelRouter.put('/:channelId', updateChannel);
channelRouter.delete('/:channelId', deleteChannel);

export default channelRouter;
