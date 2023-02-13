# Another Github Badges
**GitHub Badges for your README.md profile and projects, like visits counter.**

This version is based on **repository id**, so it's safe to rename your repository and change the badge URL. This will keep the stats intact.

There is no way to count unique visitors, because GitHub proxies all images URLs through [GitHub Camo](https://github.blog/2010-11-13-sidejack-prevention-phase-3-ssl-proxied-assets/)

## Available Badges 🎟
**Add to your README.md via markdown syntax:**

### Visits Counter
![](https://another-github-badges.ari.dev.br/badges/visits/arielfavaro/another-github-badges)

Replace `your-username` and `your-repository-name` accordingly

```markdown
![](https://another-github-badges.ari.dev.br/badges/visits/your-username/your-repository-name)
```
or
```markdown
<img src="https://another-github-badges.ari.dev.br/badges/visits/your-username/your-repository-name" />
```

### Visits History - Last 7 days
![](https://another-github-badges.ari.dev.br/badges/visits-history/arielfavaro/another-github-badges)

Replace `your-username` and `your-repository-name` accordingly

```markdown
![](https://another-github-badges.ari.dev.br/badges/visits-history/your-username/your-repository-name)
```
or
```markdown
<img src="https://another-github-badges.ari.dev.br/badges/visits-history/your-username/your-repository-name" />
```

## TODO 📌
### Application
- Add home page
- Add page showing badges and examples when visiting `/badges`
### Badges
- Add options on badge `Visits History`, like width, height, color theme
- Add badges themes
- Add badges translations

## Running locally
- Setup the environment variables with your GitHub Id and Token
- [See here for more details](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
```bash
cp .env.local.example .env
```

### Run using Docker
```bash
docker compose up -d
```
### Run the migrations
```bash
docker exec another-github-badges-web npm run migrate:up
```

Access `http://localhost:3000/badges`