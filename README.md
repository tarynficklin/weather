# weather

Weather cards for US cities (2018), now on React 19, Vite 8, Hono and Bun. Add a city and state, and each card shows the current temperature and conditions with a matching background. A Bun + Turborepo monorepo, laid out like snowstack-lab.

```sh
bun install
bun run dev       # API on 4113 + app on http://localhost:3113
bun run test      # API tests
bun run lint      # Biome (also the pre-commit hook)
bun run build     # static app in frontend/dist/
```

`bun run dev` starts both workspaces through Turborepo. The frontend waits for the API's `/health`, then starts Vite, which proxies `/api` to it. The API listens on `PORT` in `backend/.env` (default 4113), and lets the browser origins in `ALLOWED_ORIGINS` there call it from another address (comma-separated, e.g. `http://localhost:3113`; the Vite proxy is same-origin and doesn't need it); the dev server uses `PORT` in `frontend/.env` (default 3113) and proxies to `VITE_API_URL` there (or the backend's `PORT`). To move the API, change both. A `PORT` set in the shell would reach both workspaces, so set ports in the `.env` files.

| Workspace | Package | Path | Purpose |
| --- | --- | --- | --- |
| Frontend | `@weather/frontend` | `frontend/` | The cards app (React 19, Vite 8) |
| Backend | `@weather/backend` | `backend/` | The cards API (Hono on Bun) |

## How it works

- **Weather:** [Open-Meteo](https://open-meteo.com/), which is free and needs no API key. It replaces Yahoo's YQL weather API, which shut down in 2019. `frontend/src/weather.js` finds the city with Open-Meteo's geocoding, preferring a match in the chosen state, then reads the current temperature (°F), weather code and wind.
- **Backgrounds:** `frontend/src/components/cards/conditions.js` maps Open-Meteo's weather codes onto the same images the Yahoo version picked, with separate day and night choices where Yahoo had them. Strong wind shows the windy background and 95°F or more under clear skies shows the hot one. A card shows 72° and meteorites until its weather loads, or if the city can't be found, as before.
- **Cards API:** `backend/` is Hono on Bun, in place of Express. Cards still live in memory, so they reset when the API restarts (this was the "no database" project).

| Route | Does |
| --- | --- |
| `GET /api/cards` | List cards |
| `POST /api/cards` | Add `{ city, state }` |
| `PUT /api/cards/:id` | Change a card; empty fields keep their old value |
| `DELETE /api/cards/:id` | Remove a card |

Every route answers with the full list of cards.

## Fixed along the way

- Deleting a card no longer gives its weather to the card after it. Cards were keyed by position and only looked up their weather once.
- Editing a card with an empty field keeps that field. The client used to send Provo, UT for anything left blank.
- Deleting an unknown id no longer removes the last card, and updating one is a 404 instead of a crash.

## Tooling

- **Turborepo** runs the workspaces' `dev`, `build` and `test` scripts from the root (`turbo.json`).
- **Biome** (pinned to `2.4.10`, like snowstack-lab) lints and formats everything, replacing ESLint. The config is the one shared by the legacy monorepos: snowstack-lab's, with a few old-code rules (hook dependencies, array-index keys, six accessibility rules) as warnings.
- **Husky** runs `bunx biome check .` before each commit. `.gitattributes` keeps every file LF, which Biome expects.
- `bun.lock` is committed, unlike snowstack-lab, so installs reproduce exactly and `bunfig.toml`'s 7-day `minimumReleaseAge` cooldown applies to the versions it pins.
