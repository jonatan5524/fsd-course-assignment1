import express from "express";
import commentController from "../controllers/commentController";

const router = express.Router();

router.post("/", commentController.createComment);
router.get("/post/:postId", commentController.getCommentsByPostId);
router.get("/:id", commentController.getCommentById);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export default router;
