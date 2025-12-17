# Backend - RAG Resume Chatbot

Python FastAPI backend with Gemini AI integration.

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Add your GOOGLE_API_KEY to .env
```

## Run

```bash
python main.py
```

## API Endpoints

- `GET /` - Health check
- `GET /api/status` - System status
- `POST /api/upload` - Upload PDF resume
- `POST /api/chat` - Send chat message
- `GET /api/sample-questions` - Get sample questions
