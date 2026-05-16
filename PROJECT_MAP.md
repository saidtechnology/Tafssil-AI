# PROJECT MAP — Tafssil AI v0.1.0

## TECH_STACK
- **Frontend**: React Native 0.85 + Expo 55 + expo-router + react-native-svg
- **Backend**: FastAPI 0.136 + Uvicorn 0.47 + SQLAlchemy 2.0
- **AI**: MediaPipe 0.10 + OpenCV 4.13
- **PDF**: WeasyPrint 68
- **DB**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage
- **Hosting**: Render (Free Tier)

## SYSTEM_FLOW
```
[Home] → [Capture/Upload] → [Measurements] → [Pattern Type] → [SVG Preview]
→ [AI Notes] → [PDF Report]
```

## ARCHITECTURE
```
Frontend:  React Native (Expo) → REST API
Backend:   FastAPI (Python 3.13)
Database:  PostgreSQL (Supabase)
Storage:   Supabase Storage (garment-images bucket)
Hosting:   Render (autodeploy from GitHub main)
```

## LIVE LINKS
- **API**: https://tafssil-api.onrender.com
- **Health**: https://tafssil-api.onrender.com/health
- **GitHub**: https://github.com/saidtechnology/Tafssil-AI

## FILES (66 total)
```
backend/        — 28 files (FastAPI server)
frontend/       — 25 files (React Native app)
root/           —  5 files (README, LICENSE, render.yaml, etc.)
```

## ORPHANS & PENDING
- [ ] Implement real MediaPipe → measurements pipeline
- [ ] Build actual pattern SVG generation algorithms
- [ ] Add Ollama/DeepSeek integration for AI notes
- [ ] Create test suite (pytest + jest)
- [ ] Set up GitHub Actions CI/CD
- [ ] Build and publish APK via EAS Build
- [ ] Implement user authentication
