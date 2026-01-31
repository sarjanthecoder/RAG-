# 🚀 Deploying RAG Resume Chatbot to Render

This guide will walk you through deploying your RAG Resume Chatbot (FastAPI backend + React frontend) to Render.

## 📋 Prerequisites

- GitHub account
- Render account (sign up at https://render.com)
- Your Gemini API key: `AIzaSyBBp0MWL5JTSUiqBAt4ZkHl-rTmLfq1fFM`
- Git installed locally

---

## Step 1: Push Code to GitHub

### 1.1 Initialize Git Repository (if not done)

```bash
cd "c:\Users\sarja\Downloads\mini llm\09_rag_agents\RAG-"

# Initialize git (skip if already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - RAG Resume Chatbot"
```

### 1.2 Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `rag-resume-chatbot` (or any name)
3. **DON'T** initialize with README (we already have code)

### 1.3 Push to GitHub

```bash
# Replace with YOUR GitHub username
git remote add origin https://github.com/YOUR_USERNAME/rag-resume-chatbot.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the `rag-resume-chatbot` repository

### 2.2 Configure Backend

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `rag-resume-backend` (or your choice) |
| **Region** | Choose closest to you |
| **Root Directory** | `backend` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | **Free** |

### 2.3 Add Environment Variables

Click **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | `AIzaSyBBp0MWL5JTSUiqBAt4ZkHl-rTmLfq1fFM` |
| `RESUME_PATH` | `../my data engg resume.pdf` |
| `CHROMA_PERSIST_DIR` | `./chroma_db` |

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. **Copy your backend URL**: It will be something like `https://rag-resume-backend.onrender.com`

### 2.5 Verify Backend is Live

Visit: `https://YOUR-BACKEND-URL.onrender.com`

You should see:
```json
{
  "status": "online",
  "message": "RAG Resume Chatbot API v2.0",
  "version": "2.0.0"
}
```

---

## Step 3: Update Frontend API URL

Before deploying the frontend, update it to use your new backend URL.

### 3.1 Edit `frontend/src/api.js`

Change line 5 from:
```javascript
const API_BASE_URL = 'https://rag-uye6.onrender.com';
```

To:
```javascript
const API_BASE_URL = 'https://YOUR-BACKEND-URL.onrender.com';
```

Replace `YOUR-BACKEND-URL` with the actual URL from Step 2.4.

### 3.2 Commit and Push Changes

```bash
git add frontend/src/api.js
git commit -m "Update backend URL for production"
git push
```

---

## Step 4: Deploy Frontend to Render

### 4.1 Create Static Site

1. Go to https://render.com/dashboard
2. Click **"New +"** → **"Static Site"**
3. Select the same `rag-resume-chatbot` repository

### 4.2 Configure Frontend

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `rag-resume-frontend` (or your choice) |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

### 4.3 Deploy

1. Click **"Create Static Site"**
2. Wait for build and deployment (3-5 minutes)
3. **Copy your frontend URL**: It will be something like `https://rag-resume-frontend.onrender.com`

---

## Step 5: Update Backend CORS

After deploying the frontend, you need to allow it to access the backend.

### 5.1 Edit `backend/main.py`

Find the CORS configuration (around line 26-32) and update it:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://rag-resume-frontend.onrender.com",  # Your frontend URL
        "http://localhost:5173"  # For local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Replace `rag-resume-frontend.onrender.com` with YOUR actual frontend URL.

### 5.2 Commit and Push

```bash
git add backend/main.py
git commit -m "Update CORS for production frontend"
git push
```

Render will automatically redeploy your backend with the new CORS settings.

---

## 🎉 Step 6: Test Your Deployed App

1. **Visit your frontend URL**: `https://YOUR-FRONTEND-URL.onrender.com`
2. **Upload a PDF resume**
3. **Ask questions in the chat**
4. **Verify AI responds correctly**

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Backend returns 503 or is slow on first request
- **Solution**: Free tier "spins down" after 15 min of inactivity. First request will be slow (30-60 seconds), then it's fast.

**Problem**: 429 Quota Exceeded error
- **Solution**: Your Gemini API key hit quota limits. Create a new key at https://makersuite.google.com/app/apikey

**Problem**: CORS errors in browser console
- **Solution**: Make sure you updated `main.py` with your frontend URL in Step 5.

### Frontend Issues

**Problem**: Frontend can't connect to backend
- **Solution**: Check `frontend/src/api.js` has the correct backend URL

**Problem**: Build fails
- **Solution**: Check build logs in Render dashboard. May need to update Node.js version.

---

## 📊 Monitoring Usage

- **Backend logs**: Render Dashboard → Your backend service → Logs tab
- **Frontend logs**: Render Dashboard → Your frontend site → Logs tab  
- **Gemini API usage**: https://ai.dev/rate-limit

---

## 💰 Free Tier Limits

**Render Free Tier**:
- 750 hours/month (enough for 1 app running 24/7)
- Spins down after 15 min of inactivity
- Slower instance than paid tiers

**Gemini API Free Tier**:
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per day

---

## 🎯 Your Deployed URLs

After deployment, save these:

- **Frontend**: `https://_____________________________.onrender.com`
- **Backend**: `https://_____________________________.onrender.com`
- **GitHub Repo**: `https://github.com/_______________/rag-resume-chatbot`

---

## ✅ Quick Reference Commands

```bash
# Check backend locally
cd backend
python main.py
# Visit: http://localhost:8000

# Check frontend locally
cd frontend
npm run dev
# Visit: http://localhost:5173

# Push updates
git add .
git commit -m "Your message"
git push
# Render auto-deploys on push!
```

---

**Need help?** Check:
- Render Docs: https://render.com/docs
- Gemini API Docs: https://ai.google.dev/docs

**Created by**: Sarjan P  
**GitHub**: https://github.com/sarjanthecoder
