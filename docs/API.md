# API Documentation

## Base URL

```
http://localhost:8000
```

## Endpoints

### Health Check
```
GET /
```
Returns server status.

### Get Status
```
GET /api/status
```
Returns system initialization status.

### Upload Resume
```
POST /api/upload
Content-Type: multipart/form-data
```
Upload a PDF resume.

### Chat
```
POST /api/chat
Content-Type: application/json

{
  "message": "What are your skills?"
}
```

### Sample Questions
```
GET /api/sample-questions
```
Returns suggested questions.

### Reset System
```
DELETE /api/reset
```
Clears uploaded resume.
