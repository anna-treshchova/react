import * as service from './users.service.js';

export const getMe = async (req, res, next) => {
    const { id } = req.user || {};

    try {
        const user = await service.getUserById(id);

        const userProfile = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }
        res.status(200).json({ me: userProfile });
    } catch (err) {
        err.context = { ...err.context, userId: id };
        next(err);
    }
}