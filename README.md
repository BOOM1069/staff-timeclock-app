# Staff Time Clock App (Homebase Clone)

A Homebase-style employee login/logout clone for **BOOM 1069** and **1KTV**.

## Features

- Multi-location support (switch between BOOM 1069 and 1KTV).
- Time Clock view with daily roster-style layout.
- PIN keypad modal for employee clock in / clock out.
- Clock-in state and last action shown in status columns.
- Schedule view for weekly planning.
- Team view with employee search and add-employee flow.
- Local persistence via `localStorage`.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Demo PINs

- BOOM 1069: `1111`, `2222`, `3333`, `4444`
- 1KTV: `8888`, `9999`
