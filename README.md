# Redis Marketplace

- staging: https://marketplace-client-staging.herokuapp.com
- production: https://marketplace.redislabs.com/


## Setup

Create a `.env.local` file with an `API_URL`:

```bash
cp .env.example .env.local
```

## Starting the app

1. Start the API and a Redis container locally: [Backend with Redisearch](https://github.com/RisingStack/redislab-marketplace-backend)


2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deloy to staging

1. `git add -A`
2. `git commit - 'message'`
3. `git push origin main`

Pushing to main will deploy to staging automatically.

https://dashboard.heroku.com/apps/marketplace-client-staging

![image](https://user-images.githubusercontent.com/6561205/117838982-16501280-b27b-11eb-973f-b8c136274f17.png)

## Deploy to production

1. `git checkout main`
2. `git pull origin main`
3. `git checkout production`
4. `git merge main`
5. `git push origin production`

Pushing to production will trigger a build and deploy automatically to the production app.

https://dashboard.heroku.com/apps/marketplace-client-production

![image](https://user-images.githubusercontent.com/6561205/117839617-adb56580-b27b-11eb-9642-96ace7c2d269.png)

## Environment Variables

- `API_URL`: The URI for the backend application. (E.g. the staging URI: `https://marketplace-backend-staging-a.herokuapp.com/`)

In heroku this is configured at: https://dashboard.heroku.com/apps/marketplace-client-staging/settings 

![image](https://user-images.githubusercontent.com/6561205/117840572-9460e900-b27c-11eb-800e-2a7254984024.png)

## Project structure

### `/pages/index.js`

Our index page. It handles the project filtering and querying and mounts the core blocks of the app:
- Static Header with a menu bar
- Hero with the search bar
- Filter bar with tags on the left side of the page.
- Tag bar with chips for the applied filters above the browser.
- Browser with the query results
- Pagination at the bottom of the browser
- Loading up the linked sample project if there is any in the query param.

The page has server side rendering enabled with the exported `getServerSideProps` next.js function, which loads in the dynamic filters, the linked app from the query and the first `/projects` query server side.

### `/src/components/`

Here we store all the React components the index page is using.

### `/src/hooks/`

It contains custom react hooks. We currently only have one for fetching the API.

### `/src/theme.js`

Styling settings (colors, spacing) for Material UI.

### `/src/api.js`

Axios setup to communicate with the API.

## Deploying

This repo has automatic staging and production deployment turned on via Heroku. Every commit to the `main` branch also deploys the application to [staging](https://redislabs-marketplace.herokuapp.com/), every commit to the `production` branch also deploys the application to [production](https://redislabs-marketplace-prod.herokuapp.com/).

You can test out the built code locally with the following commands.

Build the code
```bash
npm run build
```

Start the app
```bash
npm run start -p 3000
```

## Code consistency

This project uses eslint and prettier to keep the code formatting and style consistent. If you are using VSCode, it should automatically format and lint everything on save.

To run the linter manually use:
```bash
npm run lint
```

To run the formatter manually use:
```bash
npm run format
```

Husky should also automatically format and lint everything before a commit.


## Application purpose:

To create a marketplace site so developers can search and browse through various Redis sample projects and find specific examples for their needs with the help of Redisearch.

## Core dependencies used for building the UI:
- [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [react](https://reactjs.org/)
- [material-ui](https://material-ui.com/)
- [axios](https://github.com/axios/axios)
