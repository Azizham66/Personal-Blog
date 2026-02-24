import { getPosts, getPostById, savePost, updatePost, deletePost } from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authorization.js'
import { Router } from 'express';

const router = Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', authMiddleware, savePost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);

export default router;