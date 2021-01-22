# Redis Marketplace

## Application purpose:

To create a marketplace site so developers can search and browse through various Redis sample projects and find specific examples for their needs with the help of Redisearch.

## Core dependencies used for building the UI:
- [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- [react](https://reactjs.org/)
- [material-ui](https://material-ui.com/)
- [axios](https://github.com/axios/axios)
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

This repo has automatic staging deployment turned on via Heroku. Every commit to the main branch also deploys the application to https://redislabs-marketplace.herokuapp.com/. You test out the built code locally with the following commands.

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
