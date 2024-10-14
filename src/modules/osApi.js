import { homedir, EOL, cpus, userInfo, arch } from 'node:os';

const getHomeDir = () => {
    try {
        return homedir;
    } catch (error) {
        return undefined;
    }
};

const getCpusInfo = async (cpus) => {
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
                console.table(await getCpusInfo(cpus()));
                break;
            case '--homedir':
                console.log(String(getHomeDir()));
                break;
            case '--username':
                console.log(userInfo().username);
                break;
            case '--architecture':
                console.log(arch());
                break;
            default:
                return 'invalid input';
        }
    } catch (error) {
        throw new Error(error);
    }
};

export { getHomeDir, getOsInfo };
