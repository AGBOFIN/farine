<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Environment Variables

The frontend requires the following environment variable:

- `NEXT_PUBLIC_API_URL`: Base URL for the backend API
  - Local development: `http://127.0.0.1:8000/api`
  - Production: `https://farine-backend.onrender.com/api`

Create a `.env.local` file in the root directory with the appropriate URL for your environment.

**IMPORTANT**: On Vercel, you must set the `NEXT_PUBLIC_API_URL` environment variable in your project settings to point to the production backend URL.

# API Configuration

The API client (src/lib/api.ts) includes:
- Automatic retry mechanism (3 attempts with exponential backoff)
- 60-second timeout for requests (to accommodate Render wake-up time)
- 3-second initial delay between retries (doubles with each attempt)
- Fallback to production URL if environment variable is not set
- Comprehensive loading states with server startup messages

# Backend Configuration

The backend (Laravel) includes:
- CORS configured to allow all origins (`allowed_origins => ['*']`)
- SQLite database by default with automatic creation in docker-entrypoint.sh
- Error handling in API controllers to return empty arrays instead of 500 errors
- Automatic database migrations and seeding on container startup
- Graceful degradation when database is not ready
