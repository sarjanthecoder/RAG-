# Setup Guide

## Prerequisites

1. Python 3.10 or higher
2. Node.js 18 or higher
3. Google Gemini API Key

## Getting Your API Key

1. Visit https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your API key to .env
python main.py
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Accessing the App

Open http://localhost:5173 in your browser.
