import { parse, join, isAbsolute, basename } from 'node:path';
import {
    stat,
    readdir,
    writeFile,
    rename,
    copyFile as fsCopyFile,
    unlink,
} from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';

const setRootPath = (path) => {
    try {
        const rootPath = parse(String(path)).root;
        return rootPath;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullPath = async (path, workingPath) => {
    try {
        const newPath = isAbsolute(path) ? path : join(workingPath, path);
        await stat(newPath);
        return newPath;
    } catch (error) {
        throw new Error(error);
    }
};

const getListFiles = async (path) => {
    try {
        const files = [];
        const folders = [];
        const result = [];
        const contents = await readdir(path);

        for (const item of contents) {
            const itemPath = join(path, item);
            const statObject = await stat(itemPath);
            if (statObject.isDirectory()) {
                folders.push(item);
            } else if (statObject.isFile()) {
                files.push(item);
            }
        }

        folders.sort();
        files.sort();

        folders.forEach((item) => {
            result.push({ Name: item, Type: 'directory' });
        });

        files.forEach((item) => {
            result.push({ Name: item, Type: 'file' });
        });

        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const readFile = async (path, workingPath) => {
    try {
        const fullPath = await getFullPath(path, workingPath);
        const readable = await createReadStream(fullPath);
        return readable;
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
        console.log(error);
        throw new Error(error);
    }
};

export {
    setRootPath,
    getFullPath,
    getListFiles,
    readFile,
    createFile,
    renameFile,
    copyFile,
    deleteFile,
};
