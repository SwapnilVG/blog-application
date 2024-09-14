import express from 'express';
import { createComment, getComments, getCommentById, updateComment, deleteComment } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createComment);
router.get('/', getComments);
router.get('/:id', getCommentById);
router.put('/:id', authMiddleware, updateComment);
router.delete('/:id', authMiddleware, deleteComment);

export default router;
