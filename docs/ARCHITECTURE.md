# Architecture

## System Overview

```
┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │
│   (React)   │     │  (FastAPI)  │
└─────────────┘     └──────┬──────┘
                          │
                    ┌─────▼─────┐
                    │ Gemini AI │
                    └───────────┘
```

## Data Flow

1. User uploads PDF resume
2. Backend extracts text from PDF
3. Text is stored in memory
4. User asks a question
5. Question + resume sent to Gemini
6. Response returned to frontend

## Technologies

- **Frontend**: React, Vite, CSS3
- **Backend**: Python, FastAPI, Uvicorn
- **AI**: Google Gemini 2.0 Flash
- **PDF**: PyPDF
