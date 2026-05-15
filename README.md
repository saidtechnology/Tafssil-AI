# Tafssil AI — تفصيل AI

**AI-powered tailoring application** — تطبيق خياطة بالذكاء الاصطناعي

Capture garment photos, input measurements, and generate precise sewing patterns with AI-powered recommendations.

## 🧵 Features

- **Multi-image capture** — Take or upload up to 5 photos per model
- **AI body measurement** — Automatic extraction via MediaPipe Pose
- **International standard sizes** — Quick selection: S, M, L, XL, 2XL, 3XL, 4XL
- **Custom measurements** — Manual input with 11 measurement fields
- **Simple patterns (10 models)** — A-Line, Bodycon, Shirt, Trousers, Skirt, Blouse, Blazer, Abaya, Kaftan, Wedding Dress
- **Professional patterns** — Custom neckline, sleeve, length, fit, collar, waistline
- **Pattern preview** — SVG-based with dimension labels
- **AI recommendations** — Fabric, fit, and adjustment suggestions (Ollama + DeepSeek)
- **PDF report export** — Complete project summary

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | React Native 0.85 + Expo 55 |
| Backend | FastAPI 0.136 + Python 3.13 |
| Database | SQLite (dev) → PostgreSQL (prod) |
| Computer Vision | MediaPipe 0.10 + OpenCV 4.13 |
| Object Detection | Ultralytics YOLOv8 |
| AI Notes | Ollama + DeepSeek |
| PDF | WeasyPrint 68 |
| Task Queue | Celery + Redis |

## 📁 Project Structure

```
Tafssil-AI/
├── backend/           # FastAPI server
│   ├── app/
│   │   ├── main.py          # API entry point
│   │   ├── config.py        # Settings
│   │   ├── routers/         # API routes
│   │   ├── services/        # Business logic
│   │   │   ├── pose_estimator.py    # MediaPipe
│   │   │   ├── measurement_calc.py  # Size tables + calc
│   │   │   ├── pattern_engine/     # Pattern generation
│   │   │   ├── ai_notes.py         # LLM integration
│   │   │   └── pdf_generator.py    # PDF export
│   │   ├── models/          # SQLAlchemy models
│   │   └── schemas/         # Pydantic schemas
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/          # React Native (Expo)
│   ├── app/                 # Expo Router screens
│   ├── components/          # Reusable components
│   ├── services/            # API client
│   └── constants/           # Standard sizes, patterns
├── .gitignore
└── README.md
```

## 🏁 Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

### AI Notes (Optional)

Install Ollama: https://ollama.com

```bash
ollama pull deepseek-r1:7b
```

## 📱 App Flow

```
Home → Capture/Upload → Measurements → Pattern Type → Preview → AI Notes → PDF Report
```

## 📄 License

MIT
