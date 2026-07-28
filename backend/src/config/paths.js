import path from 'path';
import { fileURLToPath } from 'url';

const _fileName = fileURLToPath(import.meta.url);
const _dirName = path.dirname(_fileName);

const SRC_ROOT = path.resolve(_dirName, '..');
const PROJECT_ROOT = path.resolve(SRC_ROOT, '..');

export const paths = {
    data: {
        db: path.join(PROJECT_ROOT, 'data', 'db.json'),
        users: path.join(PROJECT_ROOT, 'data', 'users.json'),
        verifications: path.join(PROJECT_ROOT, 'data', 'verifications.json'),
    },
    logo: path.join(SRC_ROOT, 'assets', 'logo.png'),
}
