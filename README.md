# SkyCast

Open source weather forecast using API`s from https://www.visualcrossing.com/ and https://developers.google.com/maps

# Tech

React + Next.JS + Axios

## Getting Started

Create a .env file with the following key/values:

```
VISUALCROSSING_KEY=howsuchstrongkey
VISUALCROSSING_API=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline
GOOGLE_KEY=anothersuchstrongkey
GOOGLE_GEOCODE_API=https://maps.googleapis.com/maps/api/geocode/json
DEBUG_ENABLED=true
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
