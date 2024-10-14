import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { getFullPath } from './getFullPath.js';

const calculateHash = async (path, workingPath) => {
    try {
        const readable = createReadStream(await getFullPath(path, workingPath));
        const hash = createHash('sha256');

        return new Promise((resolve, reject) => {
            readable.on('data', (chunk) => {
                hash.update(chunk);
            });

            readable.on('end', () => {
                const digest = hash.digest('hex');
                resolve(digest);
            });

            readable.on('error', (err) => {
                reject(err);
            });
        });
    } catch (error) {
        throw new Error(error);
    }
};

export { calculateHash };
