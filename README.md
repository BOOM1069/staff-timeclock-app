# BOOM 106.9 / 1KTV Timeclock Suite

## Your issue: "CMD is hung"

That happens because `firebase serve` is a long-running server process.

I changed the workflow so your main terminal stays usable.

## Windows quick start (non-blocking)

From:

`C:\Users\limin\OneDrive\Desktop\BoomClock`

Run:

```bat
preview.bat
```

What happens now:

1. It checks Firebase CLI + project.
2. It starts preview in a **new CMD window**.
3. It opens browser automatically to `http://127.0.0.1:5000/`.
4. Your original CMD is free (not hung).

## Stop preview server

```bat
stop-preview.bat
```

## PowerShell option

```powershell
.\preview.ps1
```

## Manual commands (if needed)

```bash
firebase login
firebase use boom-clock-70599
firebase serve --only hosting --host 127.0.0.1 --port 5000
```

If you run manual command directly, that terminal will stay busy until `Ctrl + C`.

## Open pages

- `http://127.0.0.1:5000/`
- `http://127.0.0.1:5000/admin.html`
- `http://127.0.0.1:5000/kiosk.html`

## Deploy

```bash
firebase deploy --only hosting
```
