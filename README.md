# BOOM 106.9 / 1KTV Timeclock Suite

This project now includes both:

- `admin.html` — Admin Center (payroll, team roster, schedule management, manual timecard edits, DB restore seed).
- `kiosk.html` — Studio Kiosk (PIN login, clock in/out, active staff board, geofence check).
- `index.html` — launcher page.

## Tech

- Firebase Auth + Firestore (compat SDK)
- Tailwind CDN + custom CSS

## Local run

```bash
python3 -m http.server 4173
```

Open:

- `http://localhost:4173/` (launcher)
- `http://localhost:4173/admin.html`
- `http://localhost:4173/kiosk.html`
