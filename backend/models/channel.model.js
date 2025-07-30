import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  channelBanner: {
    type: String,
    default: 'https://placehold.co/1280x720/E0E0E0/000000?text=No+Banner', // Placeholder banner
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Reference to Video model
  }],
});

const Channel = mongoose.model('Channel', ChannelSchema);

export default Channel;
