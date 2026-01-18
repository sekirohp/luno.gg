# Project Requirements

- Components
  - Next.js web app (port 3000)
  - Python FastAPI server (port 3002)
  - Voice WebSocket signaling server (port 3001)

- System
  - Node.js ≥ 20.x (Next 16)
  - Python ≥ 3.10
  - SQLite (file-based via Prisma; no separate install needed)
  - npm (uses package.json scripts)

- Environment Variables (.env at project root)
  - DATABASE_URL: SQLite connection (e.g. file:./prisma/dev.db)
  - NEXTAUTH_SECRET: Secret for NextAuth
  - NEXTAUTH_URL: Base URL (default http://localhost:3000)
  - CLOUDINARY_CLOUD_NAME: Cloudinary cloud name
  - CLOUDINARY_API_KEY: Cloudinary API key
  - CLOUDINARY_API_SECRET: Cloudinary API secret
  - INTERNAL_API_KEY: Internal API key for notifications
  - NEXT_PUBLIC_WS_URL: Voice WS URL (e.g. ws://localhost:3001)
  - PYTHON_API_PORT: Python API port (default 3002)
  - PORT: Voice server port (default 3001)
  - ALLOWED_ORIGINS: Voice server allowed origins (default http://localhost:3000)

- Code References
  - package.json: [package.json](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/package.json)
  - Prisma schema: [schema.prisma](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/prisma/schema.prisma#L12-L15)
  - Upload envs: [route.ts](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/src/app/api/upload/route.ts#L11-L69)
  - Auth secret: [auth.ts](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/src/lib/auth.ts#L7)
  - Voice server: [server.ts](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/voice-server/server.ts#L17-L19)
  - Python API README: [README.md](file:///c:/Users/"Your Name"/Downloads/luno.gg/luno.gg/python-api/README.md#L91-L97)
