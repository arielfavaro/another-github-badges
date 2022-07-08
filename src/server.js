require('dotenv').config();
const express = require('express');
const app = express();
const routerBadges = express.Router();
const { visits } = require('./lib/badges');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.redirect('https://github.com/arielfavaro');
});

routerBadges.use((req, res, next) => {
    res.set('Content-type', 'image/svg+xml;charset=utf-8');
    next();
});

routerBadges.get('/', (req, res) => {
    res.set('Content-type', 'text/html;chartset=utf-8');
    res.status(400).send('Whoops 👻');
});

routerBadges.get('/visits/:user/:repo', (req, res) => {
    // TODO implement, add validation
    // const { user, repo } = req.params;
    res.send(visits(123));
});

app.use('/badges', routerBadges);

app.listen(port, () => console.log(`App running on port ${port} 🚀`));
