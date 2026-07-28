import { AppError, ERROR_CODES } from '#shared/errors/index.js';
import * as model from './users.model.js';

export const getUserById = async (id) => {
    const user = await model.findUserById(id);

    if (!user) {
        throw new AppError(ERROR_CODES.users.USER_NOT_FOUND)
    }

    return user;
}