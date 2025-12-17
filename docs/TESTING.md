# Testing Guide

## Backend Testing

### Manual Testing
```bash
# Test health check
curl http://localhost:8000/

# Test status
curl http://localhost:8000/api/status

# Test chat
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are your skills?"}'
```

## Frontend Testing

### Run in development
```bash
npm run dev
```

### Build and preview
```bash
npm run build
npm run preview
```

## Test Cases

1. Upload PDF - should show "Ready"
2. Ask question - should get response
3. Quick buttons - should auto-send
