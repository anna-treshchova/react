import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const _fileName = fileURLToPath(import.meta.url);
const _dirName = path.dirname(_fileName);

console.log(process.env.DB_PATH)
export const paths = {
    DB_PATH: path.resolve(_dirName, '..', process.env.DB_PATH),
    USERS_PATH: path.resolve(_dirName, '..', process.env.USERS_PATH),
}




