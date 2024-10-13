import { parse } from 'node:path';

const setRootPath = (path) => {
    const rootPath = parse(String(path)).root;
    return rootPath;
};

export { setRootPath };
