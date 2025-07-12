import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { uploadImage } from '../controllers/uploads.js';

const router = express.Router();

// Protect all upload routes
router.use(isAuthenticated);

// Upload image route
router.post('/images', uploadImage);

export default router;