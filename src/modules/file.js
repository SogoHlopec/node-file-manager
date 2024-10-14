import { join, basename } from 'node:path';
import { writeFile, rename, unlink } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { getFullPath } from './getFullPath.js';

const readFile = async (path, workingPath) => {
    try {
        const fullPath = await getFullPath(path, workingPath);
        const readable = createReadStream(fullPath);

        return new Promise((resolve, reject) => {
            let data = '';
            readable.on('data', (chunk) => {
                data += chunk;
            });

            readable.on('end', () => {
                resolve(data);
            });

            readable.on('error', (err) => {
                reject(err);
            });
        });
    } catch (error) {
        throw new Error(error);
    }
};

const createFile = async (path, workingPath) => {
    try {
        const fullPath = join(workingPath, path);
        await writeFile(fullPath, '', {
            flag: 'wx',
        });
    } catch (error) {
        throw new Error(error);
    }
};

const renameFile = async (filePath, newFileName) => {
    try {
        await rename(filePath, newFileName);
    } catch (error) {
        throw new Error(error);
    }
};

const copyFile = async (filePath, newDirectoryPath, workingPath) => {
    try {
        const fileFullPath = await getFullPath(filePath, workingPath);
        const directoryFullPath = await getFullPath(
            newDirectoryPath,
            workingPath
        );
        const fileName = basename(fileFullPath);
        const newFilePath = join(directoryFullPath, fileName);

        const readable = createReadStream(fileFullPath);
        const writable = createWriteStream(newFilePath);
        readable.pipe(writable);
    } catch (error) {
        throw new Error(error);
    }
};

const deleteFile = async (path, workingPath) => {
    try {
        const fileFullPath = await getFullPath(path, workingPath);
        await unlink(fileFullPath);
    } catch (error) {
        throw new Error(error);
    }
};

const moveFile = async (filePath, newDirectoryPath, workingPath) => {
    try {
        await copyFile(filePath, newDirectoryPath, workingPath);
        await deleteFile(filePath, workingPath);
    } catch (error) {
        throw new Error(error);
    }
};

export { readFile, createFile, renameFile, copyFile, deleteFile, moveFile };
