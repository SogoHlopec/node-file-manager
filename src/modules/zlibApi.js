import { pipeline } from 'node:stream';
import { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, isAbsolute } from 'node:path';
import { getFullPath } from './fsApi.js';

const compressFile = async (path, newPath, workingPath) => {
    try {
        const fullPath = await getFullPath(path, workingPath);
        const fullNewPath = isAbsolute(newPath)
            ? newPath
            : join(workingPath, newPath);
        const bzip = createBrotliCompress();
        const file = createReadStream(fullPath);
        const compressedFile = createWriteStream(fullNewPath);

        pipeline(file, bzip, compressedFile, (err) => {
            if (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export { compressFile };
