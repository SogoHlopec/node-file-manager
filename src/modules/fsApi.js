import { parse, join } from 'node:path';
import { stat, readdir } from 'node:fs/promises';

const getRootPath = (path) => {
    try {
        const rootPath = parse(String(path)).root;
        return rootPath;
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

export { getRootPath, getListFiles };
