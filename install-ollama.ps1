# Ollama CLI installer helper
# Run this file in PowerShell with administrator privileges if needed.

$installUrl = "https://github.com/ollama/ollama/releases/download/v0.23.2/install.ps1"
$installer = "install.ps1"

Write-Host "Downloading Ollama install script..."
Invoke-WebRequest -Uri $installUrl -OutFile $installer -UseBasicParsing

if (Test-Path $installer) {
    Write-Host "Installing Ollama..."
    & .\$installer
    Write-Host "Ollama install script complete."
} else {
    Write-Error "Failed to download $installUrl"
}
