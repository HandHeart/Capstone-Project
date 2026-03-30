Set-Location $PSScriptRoot
$port = 8765
$uri = "http://127.0.0.1:$port/"
Write-Host "Server: $uri (opens in browser in 2s). Press Ctrl+C to stop."
Start-Process powershell -ArgumentList "-NoProfile", "-WindowStyle", "Hidden", "-Command", "Start-Sleep -Seconds 2; Start-Process '$uri'"
python -m http.server $port --bind 127.0.0.1
