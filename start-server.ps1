Write-Host "Starting Portfolio Server..." -ForegroundColor Green
Write-Host ""
Write-Host "Make sure you have:" -ForegroundColor Yellow
Write-Host "1. Node.js installed" -ForegroundColor Yellow
Write-Host "2. MySQL/WAMP Server running" -ForegroundColor Yellow
Write-Host "3. Database 'portfolio_contacts' created" -ForegroundColor Yellow
Write-Host ""
Write-Host "Starting server on http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
node server.js
