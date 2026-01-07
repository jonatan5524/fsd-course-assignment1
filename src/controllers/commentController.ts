import { Request, Response } from "express";
import Comment from "../models/commentModel";

const getCommentsByPostId = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId: postId });
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getCommentById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const createComment = async (req: Request, res: Response) => {
  const comment = new Comment({
    postId: req.body.postId,
    content: req.body.content,
    sender: req.body.sender,
  });
  try {
    const newComment = await comment.save();
    res.status(201).send(newComment);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedComment) {
      res.status(200).send(updatedComment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted = await Comment.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).send("Comment deleted");
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  getCommentsByPostId,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
