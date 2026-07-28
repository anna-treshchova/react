import * as service from './wishlist.service.js';

export const toggleWishlistItem = async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: itemId } = req.params;

    try {
        await service.toggleWishlistItem(userId, itemId);
        res.status(204).send();
    } catch (err) {
        err.context = {
            ...err.context,
            wishlistItem: { userId, itemId },
        }
        next(err);
    }
}

export const getWishlist = async (req, res, next) => {
    const { id: userId } = req.user;

    try {
        const wishlist = await service.getWishlist(userId);
        res.json({ wishlist });
    } catch (err) {
        err.context = {
            ...err.context,
            userId
        }
        next(err);
    }
}