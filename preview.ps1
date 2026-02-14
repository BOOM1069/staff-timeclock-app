Set-Location $PSScriptRoot

Write-Host "[1/5] Checking Firebase CLI..."
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
  Write-Host "Firebase CLI not found. Install first: npm install -g firebase-tools"
  exit 1
}

Write-Host "[2/5] Checking Firebase login/project..."
firebase use *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Run these first: firebase login ; firebase use boom-clock-70599"
  exit 1
}

Write-Host "[3/5] Starting preview in new PowerShell window (this one stays free)..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot'; firebase serve --only hosting --host 127.0.0.1 --port 5000"

Write-Host "[4/5] Waiting 3 seconds..."
Start-Sleep -Seconds 3

Write-Host "[5/5] Opening browser..."
Start-Process "http://127.0.0.1:5000/"

Write-Host "Done. Use stop-preview.bat to stop the preview server."
