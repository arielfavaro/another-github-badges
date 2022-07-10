require('dotenv').config();
const express = require('express');
const app = express();
const routerBadges = express.Router();
const { visits } = require('./lib/badges');
const apiGithub = require('./services/apiGithub');
const db = require('./models/index');
require('./cron');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
        const { id } = data;

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
