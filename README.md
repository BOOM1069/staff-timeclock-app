# BOOM 106.9 / 1KTV Timeclock Suite

This project includes:

- `admin.html` — Admin Center (payroll, team roster, schedule management, manual timecard edits, DB restore seed).
- `kiosk.html` — Studio Kiosk (PIN login, clock in/out, active staff board, geofence check).
- `index.html` — launcher page.

## Tech

- Firebase Auth + Firestore (compat SDK)
- Firebase Hosting
- Tailwind CDN + custom CSS

## Run with Firebase (same workflow you were using)

1. Install Firebase CLI (if needed):

```bash
npm install -g firebase-tools
```

2. Login:

```bash
firebase login
```

3. Serve locally with Firebase Hosting:

```bash
firebase serve --only hosting
```

4. Open:

- `http://localhost:5000/` (launcher)
- `http://localhost:5000/admin.html`
- `http://localhost:5000/kiosk.html`

## Deploy

```bash
firebase deploy --only hosting
```
