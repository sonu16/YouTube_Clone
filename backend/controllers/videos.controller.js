import Video from '../models/videos.model.js';

export const uploadVideo = async (req, res) => {
    const { title, thumbnailUrl, description, videoUrl, videoType } = req.body;
    if (!title || !videoUrl) {
        return res.status(400).json({ message: 'Title and Video URL are required' });
    }
    try {
        const newVideo = new Video({
            title,
            description,
            videoUrl,
            thumbnailUrl,
            videoType,
            uploader: req.user._id, // Assuming req.user is populated with the authenticated user's info
        });
        await newVideo.save();
        res.status(201).json({success: true, newVideo});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error uploading video metadata" });
    }
};

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().populate('uploader', 'username avatar channels createdAt'); // Populate uploader info
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching videos" });
    }
};

export const getVideoById = async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id).populate('uploader', 'username avatar channels createdAt');
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        // Increment view count
        video.views += 1;
        await video.save();
        res.status(200).json({ success: true, video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching video" });
    }
};

export const getAllVideosByUploader = async (req, res) => {
    const { uploaderId } = req.params;
    try {
        const videos = await Video.find({ uploader: uploaderId })
            .populate('uploader', 'username avatar channels createdAt')
            .sort({ uploadDate: -1 }); // Sort by upload date, most recent first
        if (videos.length === 0) {
            return res.status(404).json({ message: "No videos found for this uploader" });
        }
        res.status(200).json({ success: true, videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching uploader's videos" });
    }
};

export const updateVideoByUploader = async (req, res) => {
    const { id } = req.params;
    const { title, description, videoUrl, thumbnailUrl, videoType } = req.body;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if the uploader is the same as the authenticated user
        if (video.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this video" });
        }

        // Update video details
        video.title = title || video.title;
        video.description = description || video.description;
        video.videoUrl = videoUrl || video.videoUrl;
        video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
        video.videoType = videoType || video.videoType;

        await video.save();
        res.status(200).json({ success: true, video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error updating video" });
    }
};  

export const deleteVideoByUploader = async (req, res) => {
    const { id } = req.params;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if the uploader is the same as the authenticated user
        if (video.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this video" });
        }

        await Video.deleteOne({ _id: id });
        res.status(200).json({ success: true, message: "Video deleted successfully" });
    } catch (error) {
      console.error(error);
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: "Invalid video ID" });
      }
      res.status(500).json({ message: "Server error deleting video" });
    }
};
