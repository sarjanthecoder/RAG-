# Troubleshooting

## Common Issues

### Backend not starting
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Check .env file has valid API key

### API Key errors
- Get key from https://makersuite.google.com/app/apikey
- Ensure key is in .env file
- Restart backend after updating

### Frontend not connecting
- Ensure backend is running on port 8000
- Check browser console for errors
- Try clearing browser cache

### PDF upload fails
- Only PDF files are supported
- Check file size (< 10MB recommended)
- Ensure backend is running
