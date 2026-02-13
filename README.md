# BOOM 106.9 / 1KTV Timeclock Suite

This project includes:

- `admin.html` — Admin Center (payroll, team roster, schedule management, manual timecard edits, DB restore seed).
- `kiosk.html` — Studio Kiosk (PIN login, clock in/out, active staff board, geofence check).
- `index.html` — launcher page.

## Tech

- Firebase Auth + Firestore (compat SDK)
- Firebase Hosting
- Tailwind CDN + custom CSS

## Super simple: preview in 5 steps

### First: open terminal in your folder

You said your project is here:

`C:\Users\limin\OneDrive\Desktop\BoomClock`

In **PowerShell**:

```powershell
cd "C:\Users\limin\OneDrive\Desktop\BoomClock"
```

In **Command Prompt (cmd)**:

```bat
cd /d C:\Users\limin\OneDrive\Desktop\BoomClock
```

Then run the steps below in that same terminal.

### 1) Install Firebase CLI (one-time)

```bash
npm install -g firebase-tools
```

### 2) Sign in to Firebase (one-time)

```bash
firebase login
```

### 3) Confirm project is BOOM

```bash
firebase use
```

You should see `boom-clock-70599` (this repo already sets it in `.firebaserc`).

### 4) Start local preview

```bash
firebase serve --only hosting
```

Wait for output like:

- `Local URL: http://localhost:5000`

### 5) Open in browser

- `http://localhost:5000/`
- `http://localhost:5000/admin.html`
- `http://localhost:5000/kiosk.html`

---


## "firebase serve" looks stalled? (this is normal)

When you run:

```bash
firebase serve --only hosting
```

and see:

- `Local server: http://localhost:5000`
- request logs like `GET / HTTP/1.1 200`

that means it is working correctly and waiting for browser traffic. It does **not** exit on its own.

What to do:

1. Keep that terminal open while testing pages in browser.
2. Open:
   - `http://localhost:5000/`
   - `http://localhost:5000/admin.html`
   - `http://localhost:5000/kiosk.html`
3. When done, stop server with `Ctrl + C`.

### About `GET /favicon.ico` 404

That log line is harmless. Browser is requesting a favicon file that does not exist yet; your app still works.

---

## Deploy to live Firebase Hosting

When the preview looks good:

```bash
firebase deploy --only hosting
```

Firebase prints the live Hosting URL at the end.

---

## If you get errors

### "firebase: command not found"

Install CLI again:

```bash
npm install -g firebase-tools
```

Then restart terminal and run:

```bash
firebase --version
```

### "Not logged in"

```bash
firebase login
```

### "Wrong Firebase project"

```bash
firebase use boom-clock-70599
```

### "Permission denied on deploy"

Your logged-in Google account needs Hosting access for project `boom-clock-70599`.
