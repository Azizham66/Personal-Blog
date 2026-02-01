import { getPosts, getPostById, savePost, updatePost, deletePost } from '../controllers/postController.ts';
import { authMiddleware } from '../middleware/authorization.ts'
import { Router } from 'express';

const router = Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', authMiddleware, savePost);
router.put('/posts/:id', authMiddleware, updatePost);
router.delete('/posts/:id', authMiddleware, deletePost);

export default router;