import express from "express";
import authUser from "../middleware/authUser.js";
import { createComment, getCommentsByVideoId, deleteComment } from "../controllers/comments.controller.js";

const commentRouter = express.Router();

commentRouter.post("/addComment", authUser, createComment);
commentRouter.get("/comment/:videoId", getCommentsByVideoId); // Fetch comments for a specific video
commentRouter.delete("/:commentId", authUser, deleteComment);


export default commentRouter;