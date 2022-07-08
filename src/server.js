require('dotenv').config();
const express = require('express');
const app = express();
const routerBadges = express.Router();
const cron = require('cron');
const chalk = require('chalk');
const { visits } = require('./lib/badges');
const apiGithub = require('./services/apiGithub');
const db = require('./models/index');

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

        const [repoDatabase, created] = await db.Repo.findOrCreate({
            where: {
                repoId: id,
            },
            defaults: {
                visits: 0,
            }
        });

        // TODO check better usage
        const { dataValues } = await repoDatabase.increment('visits');

        return res.type('svg').send(visits(dataValues.visits));

    } catch (error) {
        console.error('Error on retrieving repo and saving to database');
        return res.status(400).send('Whoops 👻');
    }
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