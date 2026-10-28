# NSSA Parking System

React (Vite) frontend + Node/Express backend with a built-in SQLite database.

## Requirements

- [Node.js](https://nodejs.org) 22.13 or newer (the LTS version is fine)

## Run on a new PC

```powershell
git clone <your-repo-url>
cd <repo-folder>
copy backend\.env.example backend\.env
npm run setup
npm run dev
```

Open http://localhost:3000

The database (`backend/src/db/parking.db`) is created automatically on first start
and seeded with 20 slots and these demo accounts:

| Role      | Email                | Password     |
|-----------|----------------------|--------------|
| Admin     | admin@nssa.co.zw     | admin123     |
| Attendant | attendant@nssa.co.zw | attendant123 |
| Customer  | customer@nssa.co.zw  | customer123  |

The backend API runs on http://localhost:5000 (e.g. `/api/health`); it has no page at `/`.
