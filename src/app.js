import { dirname } from 'node:path';
import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';
import { setHomeDir } from './modules/osApi.js';
import {
    setRootPath,
    getFullPath,
    getListFiles,
    readFile,
    createFile,
    renameFile,
    copyFile,
    deleteFile,
    moveFile,
} from './modules/fsApi.js';

class app {
    constructor() {
        this.userName = setUserName();
        this.homeDir = String(setHomeDir());
        this.rootPath = String(setRootPath(this.homeDir));
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
                case 'goodbye':
                    console.log(
                        `Thank you for using File Manager, ${this.userName}, goodbye!`
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
                this.workingPath = dirname(this.workingPath);
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
            const newPath = await getFullPath(path, this.workingPath);
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
            const output = await getListFiles(this.workingPath);
            console.table(output);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async cat(path) {
        try {
            const readable = await readFile(path, this.workingPath);
            readable.pipe(stdout);
            readable.on('end', () => {
                this.getMessage('working path');
                this.prompt();
            });
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async add(path) {
        try {
            await createFile(path, this.workingPath);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async rn(args) {
        try {
            const argsSplit = args.split(' ');
            const filePath = argsSplit[0];
            const newFileName = argsSplit[1];

            await renameFile(filePath, newFileName);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async cp(args) {
        try {
            const argsSplit = args.split(' ');
            const filePath = argsSplit[0];
            const newDirectoryPath = argsSplit[1];

            await copyFile(filePath, newDirectoryPath, this.workingPath);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async rm(args) {
        try {
            await deleteFile(args, this.workingPath);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    async mv(args) {
        try {
            const argsSplit = args.split(' ');
            const filePath = argsSplit[0];
            const newDirectoryPath = argsSplit[1];

            await moveFile(filePath, newDirectoryPath, this.workingPath);
            this.getMessage('working path');
            this.prompt();
        } catch (error) {
            console.log('Operation failed');
            this.getMessage('working path');
            this.prompt();
        }
    }

    closeApp() {
        try {
            this.readLine.on('close', () => {
                this.getMessage('goodbye');
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
                const splitLine = line.split(' ');
                const command = splitLine[0];
                splitLine.shift();
                let args = splitLine.join(' ');

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
                    case 'cat':
                        if (args) {
                            this.cat(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'add':
                        if (args) {
                            this.add(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'rn':
                        if (args) {
                            this.rn(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'cp':
                        if (args) {
                            this.cp(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'rm':
                        if (args) {
                            this.rm(args);
                        } else {
                            this.getMessage('invalid input');
                        }
                        break;
                    case 'mv':
                        if (args) {
                            this.mv(args);
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
