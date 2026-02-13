Set-Location $PSScriptRoot

Write-Host "[1/4] Checking Firebase CLI..."
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
  Write-Host "Firebase CLI not found. Install first: npm install -g firebase-tools"
  exit 1
}

Write-Host "[2/4] Current folder:" (Get-Location)
Write-Host "[3/4] Active Firebase project:"
firebase use
if ($LASTEXITCODE -ne 0) {
  Write-Host "Could not read Firebase project. Run: firebase login ; firebase use boom-clock-70599"
  exit 1
}

Write-Host "[4/4] Starting hosting preview at http://127.0.0.1:5000 ..."
Write-Host "Press Ctrl+C to stop."
firebase serve --only hosting --host 127.0.0.1 --port 5000
