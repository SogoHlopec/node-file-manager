import { homedir, EOL, cpus } from 'node:os';

const setHomeDir = () => {
    try {
        return homedir;
    } catch (error) {
        return undefined;
    }
};

const getCpusInfo = (cpus) => {
    try {
        const result = [];
        cpus.forEach((item) => {
            result.push({
                Model: item.model,
                Speed: `${(item.speed / 1000).toFixed(2)} GHz`,
            });
        });
        return result;
    } catch (error) {}
};

const getOsInfo = async (args) => {
    try {
        switch (args) {
            case '--EOL':
                console.log(JSON.stringify(EOL));
                break;
            case '--cpus':
                console.table(getCpusInfo(cpus()));
                break;
            default:
                return 'invalid input';
        }
    } catch (error) {
        throw new Error(error);
    }
};

export { setHomeDir, getOsInfo };
