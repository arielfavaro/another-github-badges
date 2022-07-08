# Another Github Badges

## Available Badges 🎟
**Add to your README.md via markdown syntax:**

### Visits Counter

Replace `your-username` and `your-repository-name` accordingly

![](https://another-github-badges.ari.dev.br/badges/visits/arielfavaro/another-github-badges)

```markdown
![](https://another-github-badges.ari.dev.br/badges/visits/your-username/your-repository-name)
```
or
```markdown
<img src"https://another-github-badges.ari.dev.br/badges/visits/your-username/your-repository-name" />
```

## TODO 📌
### Application
- Add throttling to endpoints
### Bagdes
- Add badge that shows on chart the last 7 days visits history
- Add more badges
- Add badges themes
- Add badges translations

## Running locally
Setup the environment variables with your GitHub Id and Token
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