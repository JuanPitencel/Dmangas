# Dmangas

Dmangas is a React web app for reading and publishing manga, manhwa, manhua, novels, doujinshi and one-shots. It's a community driven platform: users can create groups (scanlation/translation teams), join existing ones under different roles (leader, editor, translator, typer, writer, cartoonist, re-drawnist, reviser, intern), and from there upload, read and share stories across genres like Action, Adventure, Comedy, Drama, Fantasy, Revenge and Childhood Love.

Some of what the app covers:

- Browsing and filtering books by genre, type, demographic and status.
- Group creation and membership requests with role assignment.
- Chapter upload and reading, with a dedicated chapter viewer.
- Comments with replies, ratings, stickers and emoji, on both books and chapters.
- Google sign in and email sign up/sign in.
- A personal library, reading history and favorites.
- A profile section with private routes (My Books, Create Group, Requests, Wallet, etc.) only reachable once logged in.

## Tech stack

- **React 18** with **React Router v6** for routing.
- **Context API** (`AuthProvider` / `useAuth`) to hold the logged in user and gate the private routes, through a `PrivateRoute` wrapper around every screen that needs a session.
- **Bootstrap 5** and **react-bootstrap**, combined with custom CSS, for layout, components and responsiveness (desktop and mobile).
- **react-quill** for the comment editor, **react-slick** for carousels, **react-dnd** and **react-drag-drop-files** for the chapter upload flow, **toastr** for notifications.
- **@react-oauth/google** for Google sign in.

## Running the project without a backend

This repo doesn't ship with a live API. To make it runnable on its own, there's a mock layer at `src/mocks/mockApi.js` that intercepts `window.fetch` and returns sample data (books, banners, groups, chapters, comments, etc.) for every endpoint the app calls, images included. It's controlled by an env variable, so you can turn it on and get a fully working demo with no backend at all, no real Google OAuth client needed either since the login button also runs through the mock in that mode.

## Getting started

**Requirements:** Node 18 or newer and npm.

1. Clone the repo and install dependencies:

   ```bash
   git clone <repo-url>
   cd dmangas-web-react
   npm install
   ```

2. Copy the example environment file and fill it in:

   ```bash
   cp .env.example .env
   ```

   To run fully offline against the mock data, set:

   ```
   REACT_APP_USE_MOCKS=true
   ```

   If you do have a real backend and Google OAuth client to point at, set `REACT_APP_USE_MOCKS=false` (or just remove the variable) and fill in `REACT_APP_API_URL_CORE`, `REACT_APP_API_URL_AUTH`, `REACT_APP_NODE_API_CORE_URL` and `REACT_APP_GOOGLE_AUTH_CLIENT_ID` with your own values.

3. Start the dev server:

   ```bash
   npm start
   ```

   The app runs on [http://localhost:4002](http://localhost:4002).

4. Build for production:

   ```bash
   npm run build
   ```

   The optimized build ends up in the `build` folder, ready to deploy.

## Available scripts

- `npm start`: runs the app in development mode on port 4002, with hot reload.
- `npm run build`: builds the app for production.
- `npm test`: runs the test runner in watch mode.
