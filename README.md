# E-Commerce Web Application

Online store with user accounts, shopping cart, and admin dashboard. Built as a university project for Web Applications course.
Node.js/Express e-commerce platform with MongoDB.

## Setup

```bash
pnpm install
```

Create `.env`:
```
MONGO_URI=your_mongodb_uri
SESSION_SECRET=secret
PORT=3000
```

Seed database:
```bash
node src/utils/seed.js
```

Run:
```bash
pnpm run dev
```

Admin login: `admin` / `zaq1@WSX`

