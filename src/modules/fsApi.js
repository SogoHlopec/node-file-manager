import path, { parse, join, isAbsolute } from 'node:path';
import { stat } from 'node:fs/promises';

const setRootPath = (path) => {
    try {
        const rootPath = parse(String(path)).root;
        return rootPath;
    } catch (error) {
        throw new Error(error);
    }
};

const isExist = async (path, workingPath) => {
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
        const files = await fsPromises.readdir(path.join(__dirname, 'filess'));
        for (const file of files) {
            console.log(file);
        }
    } catch (error) {
        console.log('Operation failed');
        console.log(error);
    }
};

export { setRootPath, isExist, getListFiles };
