# BOOM 106.9 / 1KTV Timeclock Suite

This project includes:

- `admin.html` — Admin Center
- `kiosk.html` — Studio Kiosk
- `index.html` — launcher page

## Fastest preview on Windows

From your folder:

`C:\Users\limin\OneDrive\Desktop\BoomClock`

Run either:

```bat
preview.bat
```

or PowerShell:

```powershell
.\preview.ps1
```

Then open:

- `http://127.0.0.1:5000/`
- `http://127.0.0.1:5000/admin.html`
- `http://127.0.0.1:5000/kiosk.html`

---

## Manual Firebase commands

```bash
npm install -g firebase-tools
firebase login
firebase use boom-clock-70599
firebase serve --only hosting --host 127.0.0.1 --port 5000
```

Deploy:

```bash
firebase deploy --only hosting
```

---

## If you cannot open any HTTP site

Use this checklist exactly:

1. **Make sure server is running** and shows:
   - `Local server: http://127.0.0.1:5000`
2. Open **127.0.0.1** URL directly (not just `localhost`):
   - `http://127.0.0.1:5000/`
3. Hard refresh browser: **Ctrl + F5**.
4. Try Incognito window.
5. Check if port is busy:
   ```bat
   netstat -ano | findstr :5000
   ```
6. If 5000 is blocked, run different port:
   ```bash
   firebase serve --only hosting --host 127.0.0.1 --port 8080
   ```
   then open `http://127.0.0.1:8080/`.
7. If still blocked, check Windows Firewall / antivirus web shield for localhost blocking.

---

## Kiosk mode meaning

- Green banner: `LIVE MODE: FIREBASE CONNECTED`
- Orange banner: `OFFLINE DEMO MODE: FIREBASE UNAVAILABLE`

If you see offline mode and want live data:

1. Firebase Console → Authentication → Sign-in method → enable **Anonymous**.
2. Firebase Console → Authentication → Settings → add `localhost` to authorized domains.
