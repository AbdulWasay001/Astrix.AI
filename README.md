# Astrix AI

This project contains an Express backend and a Vite React frontend for a simple chat app using Ollama.

## Backend

1. `cd backend`
2. `npm install`
3. `npm start`

The backend listens on port `5000` and proxies requests to `http://localhost:11434/api/generate`.

## Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

The frontend runs at `http://localhost:5173`.

## Notes

- `server.js` sends chat prompts to a local Ollama instance using model `llama3`.
- `ollama` was not present in the environment, so it needs to be installed on the host machine before running the model.
- Use the included `install-ollama.ps1` helper script to install Ollama locally.
- Once Ollama is installed, run `run-llama3.ps1` to launch the llama3 model.

## Scripts

- `install-ollama.ps1`: downloads and runs the Ollama install script.
- `run-llama3.ps1`: starts `ollama run llama3`.
