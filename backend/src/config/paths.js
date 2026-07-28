import path from 'path';
import { fileURLToPath } from 'url';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const SRC_ROOT = path.resolve(dirName, '..');
const PROJECT_ROOT = path.resolve(SRC_ROOT, '..');

export const PATHS = {
    data: {
        destinations: path.join(PROJECT_ROOT, 'data', 'destinations.json'),
        hotels: path.join(PROJECT_ROOT, 'data', 'hotels.json'),
        users: path.join(PROJECT_ROOT, 'data', 'users.json'),
        wishlist: path.join(PROJECT_ROOT, 'data', 'wishlist.json'),
        verifications: path.join(PROJECT_ROOT, 'data', 'verifications.json'),
        blacklistedTokens: path.join(PROJECT_ROOT, 'data', 'blacklisted-tokens.json'),
    },
    logo: path.join(SRC_ROOT, 'assets', 'logo.png'),
}
