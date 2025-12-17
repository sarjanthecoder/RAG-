# Deployment Guide

## Local Development

Already set up? Just run:

```bash
# Terminal 1 - Backend
cd backend && python main.py

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Production Build

### Frontend Build
```bash
cd frontend
npm run build
```

### Deploy Options

1. **Vercel** - Deploy frontend
2. **Railway** - Deploy backend
3. **Docker** - Full containerization

## Environment Variables

Required in production:
- `GOOGLE_API_KEY` - Gemini API key
