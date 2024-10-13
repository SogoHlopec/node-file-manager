import * as process from 'node:process';

const setUserName = () => {
    try {
        let userName;
        const args = process.argv;
        args.forEach((item) => {
            if (item.startsWith('--')) {
                const propName = item.replace('--', '').split('=')[0];
                if (propName === 'username') {
                    userName = item.split('=')[1];
                }
            }
        });
        return userName;
    } catch (error) {
        return undefined;
    }
};

export { setUserName };
