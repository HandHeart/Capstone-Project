Set-Location $PSScriptRoot
$port = 8765
$uri = "http://127.0.0.1:$port/"
Write-Host "Starting server at $uri"
$py = Start-Process -FilePath python -ArgumentList @("-m", "http.server", "$port", "--bind", "127.0.0.1") -WorkingDirectory $PSScriptRoot -PassThru -WindowStyle Minimized
Start-Sleep -Seconds 1
if (-not $py.HasExited) {
  Start-Process $uri
  Write-Host "Browser opened. Close the minimized Python window or end the process to stop the server."
  Wait-Process -Id $py.Id
} else {
  Write-Host "Server failed to start. Is Python installed?"
}
