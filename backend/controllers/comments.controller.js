import Comment from "../models/comments.model.js";

export const createComment = async (req, res) => {
    const { video, text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }
    try {
        const comment = new Comment({author: req.user._id, text, video});
        await comment.save();
        res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting comment" });
  }
};

export const getCommentsByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ video: videoId }).populate('author', 'username avatar createdAt') // Populate author details
        .sort({ createdAt: 1 }); // Sort comments by creation date, oldest first
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid video ID" });
    } 
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(400).json({ message: "Invalid comment ID" });
    }
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
