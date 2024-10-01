# Asset Search Demo

A simple frontend for a simple asset table with search, sort, multi-filter.
Fleshing out a skeleton for how I would build something similar.

![Demo screenshot](public/table-screenshot.jpg)

Demo credentials are

- Email: `demo@example.com`
- Password: `demo`

Note that data (in `src/assets/stock-data.mock.ts`) is ChatGPT-generated. ESG scores are inspired by MSCI ESG ratings but they are in no way reflective of reality.

## Known Issues

1. Due to the nature of GitHub Pages, while rewriting to history/location seems to work fine (and would work fine if deployed elsewhere), when attempting to navigate directly to the route that's written (e.g., `.../asset-list-demo/assets`) it will fail as it queries GitHub's resource for that route (i.e., trying to fetch the deployment at that route), rather than defaulting to the "base" deployment of said route (in this case, the current deployment). This is also the case for refreshes.
   - Decided to drop the "routing" entirely - but if needed, this could be deployed elsewhere (or ran locally) with routing logic.
2. Data tables are always wonky in mobile, but there appears to be an issue where the window is slightly offset when entering the assets page. Not sure why this is.
   - Limited number of rows displayed per page on mobile to 5, and forced a scroll up. This helps, but not a complete resolution.

## Development

This is a Vite + React + TypeScript + Tailwind project bootstrapped from [`create-vite`](https://www.npmjs.com/package/create-vite).
