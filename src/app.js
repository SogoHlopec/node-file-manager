import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';
import { setHomeDir } from './modules/osApi.js';

class app {
    constructor() {
        this.userName = setUserName();
        this.homeDir = setHomeDir();
        this.workingPath = this.homeDir;

        this.readLine = createInterface({
            input: stdin,
            output: stdout,
        });
    }

    getMessage(action) {
        switch (action) {
            case 'hello':
                console.log(`Welcome to the File Manager, ${this.userName}!`);
                break;
            case 'workingPath':
                console.log(`You are currently in ${this.workingPath}`);
                break;

            default:
                break;
        }
    }

    setPrompt() {
        this.readLine.setPrompt('Enter the command:\n');
        this.readLine.prompt();
    }

    closeApp() {
        this.readLine.on('close', () => {
            console.log(
                `Thank you for using File Manager, ${this.userName}, goodbye!`
            );
        });
    }

    async start() {
        this.getMessage('hello');
        this.getMessage('workingPath');
        this.setPrompt();

        this.readLine.on('line', (line) => {
            if (line === '.exit') {
                this.readLine.close();
            }
        });
        this.closeApp();
    }
}

export { app };
