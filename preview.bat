@echo off
setlocal

cd /d "%~dp0"

echo [1/4] Checking Firebase CLI...
where firebase >nul 2>nul
if errorlevel 1 (
  echo Firebase CLI not found. Install first:
  echo   npm install -g firebase-tools
  exit /b 1
)

echo [2/4] Current folder:
cd

echo [3/4] Active Firebase project:
firebase use
if errorlevel 1 (
  echo Could not read Firebase project. Run:
  echo   firebase login
  echo   firebase use boom-clock-70599
  exit /b 1
)

echo [4/4] Starting hosting preview at http://127.0.0.1:5000 ...
echo Press Ctrl+C to stop.
firebase serve --only hosting --host 127.0.0.1 --port 5000
