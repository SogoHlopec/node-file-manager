import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';

class FileManager {
    constructor() {
        this.userName = setUserName();
    }

    getMessage(action) {
        switch (action) {
            case 'hello':
                console.log(`Welcome to the File Manager, ${this.userName}!`);
                break;
            default:
                break;
        }
    }

    async start() {
        this.getMessage('hello');
        console.log('start app');
    }
}

export { FileManager };
