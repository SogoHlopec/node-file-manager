import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline/promises';
import { setUserName } from './modules/cliApi.js';

class app {
    constructor() {
        this.userName = setUserName();

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

            default:
                break;
        }
    }

    async start() {
        this.getMessage('hello');
        console.log('start app');

        this.readLine.on('line', (line) => {
            if (line === '.exit') {
                this.readLine.close();
            }
        });
        this.readLine.on('close', () => {
            console.log(
                `Thank you for using File Manager, ${this.userName}, goodbye!`
            );
        });
    }
}

export { app };
