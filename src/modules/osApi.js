import { homedir, EOL } from 'node:os';

const setHomeDir = () => {
    try {
        return homedir;
    } catch (error) {
        return undefined;
    }
};

const getOsInfo = async (args) => {
    try {
        switch (args) {
            case '--EOL':
                console.log(JSON.stringify(EOL));
                break;

            default:
                console.log(error);
                break;
        }
    } catch (error) {
        throw new Error(error);
    }
};

export { setHomeDir, getOsInfo };
