import { homedir } from 'node:os';

const setHomeDir = () => {
    try {
        return homedir;
    } catch (error) {
        return undefined;
    }
};

export { setHomeDir };
