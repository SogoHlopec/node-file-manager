import { join, isAbsolute } from 'node:path';
import { stat } from 'node:fs/promises';

const getFullPath = async (path, workingPath) => {
    try {
        const newPath = isAbsolute(path) ? path : join(workingPath, path);
        await stat(newPath);
        return newPath;
    } catch (error) {
        throw new Error(error);
    }
};

export { getFullPath };
