import { pipeline } from 'node:stream';
import { join, isAbsolute } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
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
                throw new Error(err);
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

const decompressFile = async (path, newPath, workingPath) => {
    try {
        const fullPath = await getFullPath(path, workingPath);
        const fullNewPath = isAbsolute(newPath)
            ? newPath
            : join(workingPath, newPath);
        const bunzip = createBrotliDecompress();
        const file = createReadStream(fullPath);
        const decompressedFile = createWriteStream(fullNewPath);

        pipeline(file, bunzip, decompressedFile, (err) => {
            if (err) {
                throw new Error(err);
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

export { compressFile, decompressFile };
