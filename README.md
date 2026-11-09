# Airbnb Clone

A full-stack listing app inspired by Airbnb. Browse stays, create and edit listings, leave reviews, and sign up or log in with a local account.

## Stack

- **Frontend:** React 19, Vite, React Router, Axios, React Toastify, MapTiler
- **Backend:** Express, Mongoose, Passport (local), express-session, Joi
- **Database:** MongoDB (`airbnb` on `localhost:27017`)

## Features

- List all stays and search by title, description, or country
- View a listing with reviews and owner details
- Create, edit, and delete listings
- Add reviews (comment + 1–5 rating)
- Sign up, log in, and log out with session cookies

## Prerequisites

- Node.js
- MongoDB running locally on port `27017`

## Setup

Install dependencies in both apps:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run locally

Start the API (port **5001**):

```bash
cd backend
npx nodemon app.js
```

Start the Vite frontend (port **5173**):

```bash
cd frontend
npm run dev
```

Open [http://localhost:5173/listings](http://localhost:5173/listings). The API allows CORS from that origin and uses `credentials: true` for sessions.

## Frontend routes

| Path | Page |
|------|------|
| `/listings` | Home / all listings |
| `/listing/:id` | Listing detail |
| `/listing/:id/edit` | Edit listing |
| `/new` | Create listing |
| `/login` | Log in |
| `/signup` | Sign up |

## API (backend)

Base URL: `http://localhost:5001`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/listings` | All listings |
| GET | `/listings/:id` | One listing (reviews + owner populated) |
| POST | `/listings/new` | Create listing |
| PUT | `/listing/:id` | Update listing |
| DELETE | `/listing/:id/delete` | Delete listing |
| POST | `/listing/:id/review` | Add a review |
| GET | `/listing/:id/getreview` | Reviews for a listing |
| POST | `/signup` | Register |
| POST | `/login` | Log in |
| GET | `/logout` | Log out |
| GET | `/isloggedin` | Current session |

Many write endpoints redirect back to the frontend after success.

## Project structure

```
Airbnb/
├── backend/
│   ├── app.js                 # Express app and routes
│   ├── models/                # Listing, Review, User
│   ├── schema_validation.js   # Joi listing schema
│   └── ErrorHandler.js
└── frontend/
    └── src/
        └── landing_page/
            ├── Home/          # Listings, login, signup
            ├── Show/          # Detail, new, edit, reviews
            └── Universal/     # Navbar
```

## Notes

- MongoDB URL is hardcoded in `backend/app.js` as `mongodb://127.0.0.1:27017/airbnb`.
- Session secret is currently in `app.js`. Change it before deploying.
- Production frontend assets are served from `frontend/dist` when you run the Express server after `npm run build` in `frontend`.
