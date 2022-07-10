const cron = require('cron');
const chalk = require('chalk');
const apiGithub = require('./services/apiGithub');

cron.job('*/10 * * * *', async () => {
    console.log(chalk.white.bgBlue.bold('GitHub api rate usage'));
    try {
        const { data } = await apiGithub.get('/rate_limit');
        console.log(
            `
            Limit: ${data.rate.limit}
            Used: ${data.rate.used}
            Remaining: ${data.rate.remaining}
            Reset at: ${data.rate.reset}
            `
        );

    } catch (error) {
        console.error('Error fetching GitHub api usage');
        // TODO
        console.error(error.response.status);
        console.error(error.response.statusText);
    }
}).start();
