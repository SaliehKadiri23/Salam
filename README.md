# Islamic Growth Application

BIS MILLAH HIR RAHMA NIR RAHIM

A comprehensive Islamic web application that provides articles, resources, prayers, and community features for Muslims.

## Deployment on Render

This application can be deployed on Render as a web service. The application is built as a monorepo with both client (React) and server (Node.js/Express) components.

### Environment Variables Required on Render

- `DB_URL`: Your MongoDB connection string
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `SESSION_SECRET`: Secret for express sessions

### Build and Start Commands

**Build Command:**

```
npm install && npm run build
```

**Start Command:**

```
npm start
```

The application will be available at:

- Server API: `https://salam-phi.vercel.app/`
- Client Interface: `https://salam2-five.vercel.app/` (served from the same domain)

### Architecture Notes

- The client (React/Vite) builds to a `dist` folder which is then served by the Express server
- The Express server handles both API requests and serves static files in production
- All API routes are prefixed (e.g., `/api/auth`, `/articles`, etc.)
- The React app uses client-side routing which is handled by the Express catch-all route
