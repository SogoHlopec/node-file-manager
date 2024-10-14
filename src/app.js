import { dirname } from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';
import { setHomeDir } from './modules/osApi.js';
import { setRootPath, isExist, getListFiles } from './modules/fsApi.js';

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
                    console.log(`You are currently in ${this.workingPath}`);
                    break;
                case 'invalid input':
                    console.log(`Invalid input`);
                    this.getMessage('working path');
                    this.prompt();
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    prompt() {
        try {
            this.readLine.prompt();
        } catch (error) {
            throw new Error(error);
        }
    }

    up() {
        try {
            if (this.workingPath !== this.rootPath) {
                this.workingPath = dirname(String(this.workingPath));
            }
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async cd(path) {
        try {
            const newPath = await isExist(path, this.workingPath);
            if (newPath) {
                this.workingPath = newPath;
                this.getMessage('working path');
                this.prompt();
            }
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async ls() {
        try {
            await getListFiles(this.workingPath);
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
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
            this.readLine.setPrompt('Enter the command:\n');
            this.prompt();

            this.readLine.on('line', (line) => {
                const command = line.split(' ')[0];
                const args = line.split(' ')[1];

                switch (command) {
                    case '.exit':
                        this.readLine.close();
                        break;
                    case 'up':
                        if (!args) {
                            this.up();
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'cd':
                        if (args) {
                            this.cd(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'ls':
                        if (!args) {
                            this.ls();
                        } else {
                            this.getMessage('invalid input');
                        }
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
