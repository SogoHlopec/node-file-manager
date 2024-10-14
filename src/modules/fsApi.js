import { parse, join, isAbsolute } from 'node:path';
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
        return newPath;
    } catch (error) {
        console.log('Operation failed');
        console.log(error);
    }
};

export { setRootPath, isExist };
