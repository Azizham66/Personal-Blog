# Environment Variables Setup

This project uses environment variables to configure the API server URL.

## Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Or create a `.env` file in the client directory with:
```
VITE_API_URL=http://localhost:3000
```

3. Update the `VITE_API_URL` to match your server's port:
- For development: `http://localhost:3000` (or your server port)
- For production: `https://your-api-domain.com`

## Notes

- The client uses `import.meta.env.VITE_API_URL` to access this variable
- Environment variables must start with `VITE_` to be exposed to Vite
- The `.env` file is already in `.gitignore` for security
- Default fallback is `http://localhost:3000` if not set
