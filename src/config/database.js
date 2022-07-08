// const fs = require('fs');

module.exports = {
    development: {
        username: 'root',
        password: '1234',
        database: 'github_badges',
        host: process.env.DEV_DB_HOSTNAME || 'another-github-badges-db', // TODO check if inside docker... another-github-badges-db
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: 'mysql',
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            // }
        }
    }
};