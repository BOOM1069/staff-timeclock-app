@echo off
setlocal

cd /d "%~dp0"

echo [1/5] Checking Firebase CLI...
where firebase >nul 2>nul
if errorlevel 1 (
  echo Firebase CLI not found. Install first:
  echo   npm install -g firebase-tools
  exit /b 1
)

echo [2/5] Checking Firebase login/project...
firebase use >nul 2>nul
if errorlevel 1 (
  echo Run these first:
  echo   firebase login
  echo   firebase use boom-clock-70599
  exit /b 1
)

echo [3/5] Starting preview in a NEW window (so this CMD is NOT blocked)...
start "BoomClock Preview Server" cmd /k "cd /d %~dp0 && firebase serve --only hosting --host 127.0.0.1 --port 5000"

echo [4/5] Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo [5/5] Opening browser...
start "" "http://127.0.0.1:5000/"

echo Done. If you need to stop preview, run stop-preview.bat
