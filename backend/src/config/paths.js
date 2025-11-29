import path from 'path';
import { fileURLToPath } from 'url';

const _fileName = fileURLToPath(import.meta.url);
const _dirName = path.dirname(_fileName);

export const paths = {
    DB_PATH: path.resolve(_dirName, '../../data/db.json'),
    USERS_PATH: path.resolve(_dirName, '../../data/users.json'),
}
