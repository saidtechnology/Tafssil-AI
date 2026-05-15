# PROJECT MAP — Tafssil AI

## TECH_STACK
- **Frontend**: React Native 0.85 + Expo 55 + expo-router + react-native-svg
- **Backend**: FastAPI 0.136 + Uvicorn 0.47 + SQLAlchemy 2.0 + Celery 5.6
- **AI**: MediaPipe 0.10 + OpenCV 4.13 + Ultralytics 8.4 + Ollama (DeepSeek)
- **PDF**: WeasyPrint 68
- **DB**: SQLite (dev) → PostgreSQL (prod)
- **Cache**: Redis 7 (Celery broker)

## SYSTEM_FLOW
```
[Home] → [Capture/Upload] → [Size/AI Measure] → [Pattern Type] → [Preview]
→ [AI Notes] → [PDF Report]
```

## ARCHITECTURE
```
Monorepo:
  /backend      — FastAPI Python server
  /frontend     — React Native Expo app
  API: REST over HTTP (JSON)
  Async: Celery + Redis for heavy AI processing
  Storage: Local filesystem for images, SQLite for metadata
```

## ORPHANS & PENDING
- [ ] Install MediaPipe 0.10.35
- [ ] Install OpenCV 4.13.0.92
- [ ] Install Ultralytics 8.4.51
- [ ] Upgrade FastAPI from 0.118 → 0.136.1
- [ ] Install Ollama + pull DeepSeek model
- [ ] Define all 10 simple pattern algorithms in pattern_engine/
- [ ] Implement multi-image merge in image_processor.py
- [ ] Create Expo development build
- [ ] Test full end-to-end flow
- [ ] Set up GitHub Actions CI/CD
