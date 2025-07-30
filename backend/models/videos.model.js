import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  thumbnailUrl: { // URL to the video thumbnail
    type: String,
    default: 'https://placehold.co/1280x720/E0E0E0/000000?text=No+Thumbnail', // Placeholder
  },
  description: {
    type: String,
    default: '',
  },
  videoUrl: { // URL to the hosted video file (e.g., S3, Cloudinary)
    type: String,
    required: true,
  },
  videoType: {
    type: String,
    default: 'All', // Type of video (e.g., 'All', 'Music', 'Gaming', etc.)
  },
  uploader: { // Can be a User (for personal uploads) or a Channel
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a user can directly upload videos without a formal "channel"
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0, // Count of likes for the video
  },
  dislikes: {
    type: Number,
    default: 0, // Count of dislikes for the video
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  }
});

const Video = mongoose.model('Video', VideoSchema);

export default Video;
