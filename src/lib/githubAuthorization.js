const GITHUB_USER_ID = process.env.GITHUB_USER_ID;
const GITHUB_USER_TOKEN = process.env.GITHUB_USER_TOKEN;

const GITHUB_AUTHORIZATION = `Basic ${Buffer.from(`${GITHUB_USER_ID}:${GITHUB_USER_TOKEN}`, 'utf8').toString('base64')}`;

module.exports = GITHUB_AUTHORIZATION;