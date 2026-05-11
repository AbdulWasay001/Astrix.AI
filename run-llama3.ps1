# Start the Ollama llama3 model.
# Run this after Ollama is installed and the model has been downloaded.

# Find ollama executable
$ollamaPath = Get-Command ollama -ErrorAction SilentlyContinue
if (-not $ollamaPath) {
    # Try common installation locations
    $possiblePaths = @(
        "C:\Program Files\Ollama\ollama.exe",
        "C:\Users\$env:USERNAME\AppData\Local\Programs\Ollama\ollama.exe",
        "C:\Users\$env:USERNAME\AppData\Local\Ollama\ollama.exe",
        "$env:USERPROFILE\scoop\shims\ollama.exe",
        "$env:USERPROFILE\bin\ollama.exe"
    )

    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            $ollamaPath = $path
            break
        }
    }
}

if ($ollamaPath) {
    Write-Host "Found Ollama at: $ollamaPath"
    Write-Host "Starting llama3 model with Ollama..."
    Start-Process -FilePath $ollamaPath -ArgumentList "run llama3" -NoNewWindow
    Write-Host "Ollama llama3 process launched."
} else {
    Write-Error "Ollama executable not found. Please ensure Ollama is installed and in your PATH, or update this script with the correct path."
}
