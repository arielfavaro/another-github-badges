require('dotenv').config();
const express = require('express');
const app = express();
const routerBadges = express.Router();
const { visits } = require('./lib/badges');
const apiGithub = require('./services/apiGithub');
const db = require('./models/index');
const { chartSvg } = require('./services/chartSvg');
require('./cron');

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.redirect('https://github.com/arielfavaro/another-github-badges');
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

        await db.RepoVisit.create({
            RepoId: repoDatabase.id,
        });

        return res.type('svg').send(visits(dataValues.visits));

    } catch (error) {
        console.error('Error on retrieving repo and saving to database');
        return res.status(400).send('Whoops 👻');
    }
});

routerBadges.get('/visits-history/:user/:repo', async (req, res) => {

    const { user, repo } = req.params;

    try {
        const { data } = await apiGithub.get(`/repos/${user}/${repo}`);
        const { id } = data;

        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const [repoDatabase] = await db.Repo.findOrCreate({
            where: {
                repoId: id,
            },
            defaults: {
                visits: 0,
            }
        });

        // TODO check better query!!!!
        const [results] = await db.sequelize.query(`
            SELECT dates.date, COUNT(RepoVisits.id) AS visits
            FROM (
                SELECT DATE_FORMAT('${date}', '%m-%d') AS date
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 1 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 2 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 3 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 4 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 5 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 6 DAY), '%m-%d')
                UNION ALL SELECT DATE_FORMAT(DATE_SUB('${date}', INTERVAL 7 DAY), '%m-%d')
            ) dates

            LEFT JOIN RepoVisits ON dates.date = DATE_FORMAT(RepoVisits.createdAt, '%m-%d')
            AND RepoVisits.RepoId = ${repoDatabase.id}
            AND RepoVisits.createdAt >= DATE_FORMAT(DATE_SUB('${date}', INTERVAL 1 WEEK), '%Y-%m-%d')

            GROUP BY dates.date
            ORDER BY dates.date ASC;
        `);

        const options = { width: 600, height: 200 };
        const chartData = {
            labels: results.map(result => result.date),
            series: [
                results.map(result => result.visits),
            ],
        };

        const chart = await chartSvg(chartData, options);

        return res.type('svg').send(chart);

    } catch (error) {
        console.error('Error on retrieving repo stats');
        return res.status(400).send('Whoops 👻');
    }

});

routerBadges.get('/stargazers/:user/:repo', async (req, res) => {

    const { user, repo } = req.params;

    const perPage = 50;

    try {

        const repoInfoResponse = await apiGithub.get(`/repos/${user}/${repo}`);

        const stargazersTotalCount = repoInfoResponse.data.stargazers_count;

        const pagesCount = Math.round(stargazersTotalCount / perPage);

        const fetchStargazers = async (page) => await apiGithub.get(`/repos/${user}/${repo}/stargazers`, {
            headers: {
                'Accept': 'application/vnd.github.star+json',
            },
            params: {
                per_page: perPage,
                page: page,
            },
        });

        const starredAtDates = [];

        for (let i = 1; i <= pagesCount; i++) {
            const { data } = await fetchStargazers(i);

            const stars = data.map(item => item.starred_at);

            starredAtDates.push(...stars);
        }

        res.send(starredAtDates);

    } catch (error) {
        console.error(error);
        res.send('Ooops');
    }

});

app.use('/badges', routerBadges);

app.listen(port, () => console.log(`App running on port ${port} 🚀`));
