const cron = require('node-cron');
const { exec } = require('child_process');

const command = '/usr/local/bin/node ./index.js';

cron.schedule('0 9 * * *', () => {
    console.log(`Running ${command} at 9:00 AM Calgary time`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}, {
    timezone: 'America/Edmonton'
});
