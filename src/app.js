import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';
import { setHomeDir } from './modules/osApi.js';
import { setRootPath } from './modules/pathApi.js';

class app {
    constructor() {
        this.userName = setUserName();
        this.homeDir = setHomeDir();
        this.rootPath = setRootPath(this.homeDir);
        this.workingPath = this.homeDir;

        this.readLine = createInterface({
            input: stdin,
            output: stdout,
        });
    }

    getMessage(action) {
        try {
            switch (action) {
                case 'hello':
                    console.log(
                        `Welcome to the File Manager, ${this.userName}!`
                    );
                    break;
                case 'working path':
                    console.log(`You are currently in ${this.workingPath} - ${this.rootPath}`);
                    break;
                case 'invalid input':
                    console.log(`Invalid input`);
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    setPrompt() {
        try {
            this.readLine.setPrompt('Enter the command:\n');
            this.readLine.prompt();
        } catch (error) {
            throw new Error(error);
        }
    }

    closeApp() {
        try {
            this.readLine.on('close', () => {
                console.log(
                    `Thank you for using File Manager, ${this.userName}, goodbye!`
                );
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async start() {
        try {
            this.getMessage('hello');
            this.getMessage('working path');
            this.setPrompt();

            this.readLine.on('line', (line) => {
                switch (line) {
                    case '.exit':
                        this.readLine.close();
                        break;

                    default:
                        this.getMessage('invalid input');
                        break;
                }
            });
            this.closeApp();
        } catch (error) {
            throw new Error(error);
        }
    }
}

export { app };
