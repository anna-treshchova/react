import { PATHS } from '#config/paths.js';
import { readJSONSync, writeJSON } from '#utils/db.js';

let wishlistCache = readJSONSync(PATHS.data.wishlist) || [];

export const findUserWishlist = async (userId) => {
    return wishlistCache.filter(item => item.userId === userId);
}

export const findWishlistItem = async (userId, itemId) => {
    const userWishlist = await findUserWishlist(userId);
    return userWishlist.find(item => item.itemId === itemId);
}

export const createWishlistItem = async (userId, itemId) => {
    const newWishlistItem = {
        userId,
        itemId,
        createdAt: new Date().toISOString()
    }
    wishlistCache.push(newWishlistItem);

    await writeJSON(PATHS.data.wishlist, wishlistCache);
}

export const deleteWishlistItem = async (userId, itemId) => {
    wishlistCache = wishlistCache.filter(
        item => !(item.userId === userId && item.itemId === itemId)
    );

    await writeJSON(PATHS.data.wishlist, wishlistCache);
}


