const axios = require('axios').default;
const GITHUB_AUTHORIZATION = require('../lib/githubAuthorization');
const GITHUB_API_ENDPOINT = 'https://api.github.com';

const apiGithub = axios.create({
    baseURL: GITHUB_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': GITHUB_AUTHORIZATION,
    },
    timeout: 15000,
});

module.exports = apiGithub;