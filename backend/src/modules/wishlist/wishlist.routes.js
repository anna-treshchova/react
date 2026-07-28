import express from 'express';
import { requireAuth } from '#modules/auth/index.js';
import { toggleWishlistItem } from './wishlist.controller.js';
import { getWishlist } from './wishlist.controller.js';
const router = express.Router();

router.get('/', requireAuth, getWishlist);
router.post('/:id', requireAuth, toggleWishlistItem);

export default router;