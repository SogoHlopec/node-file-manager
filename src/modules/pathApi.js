import { parse } from 'node:path';

const setRootPath = (path) => {
    try {
        const rootPath = parse(String(path)).root;
        return rootPath;
    } catch (error) {
        throw new Error(error);
    }
};

export { setRootPath };
