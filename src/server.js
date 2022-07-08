require('dotenv').config();
const express = require('express');
const app = express();
const routerBadges = express.Router();
const cron = require('cron');
const chalk = require('chalk');
const { visits } = require('./lib/badges');
const apiGithub = require('./services/apiGithub');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.redirect('https://github.com/arielfavaro');
});

routerBadges.get('/', (req, res) => {
    res.set('Content-type', 'text/html;chartset=utf-8');
    res.status(400).send('Whoops 👻');
});

routerBadges.get('/visits/:user/:repo', async (req, res) => {

    const { user, repo } = req.params;

    try {
        const { data } = await apiGithub.get(`/repos/${user}/${repo}`);
        const { id, full_name, url } = data;

        // TODO implement
        // TODO save repo id as key instead of user-repo as slug on database?
        console.log(id);

    } catch (error) {
        return res.status(400).send('Whoops 👻');
    }

    res.type('svg').send(visits(123));
});

app.use('/badges', routerBadges);

app.listen(port, () => console.log(`App running on port ${port} 🚀`));


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