<div align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue?style=for-the-badge" alt="Version 0.1.0"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License"/>
  <img src="https://img.shields.io/badge/status-alpha-orange?style=for-the-badge" alt="Alpha Status"/>
  <br/>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/MediaPipe-0097A7?style=for-the-badge&logo=google&logoColor=white"/>
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/تفصيل-AI-1a1a2e?style=for-the-badge&labelColor=e94560" alt="Tafssil AI"/>
</p>

<h1 align="center">🧵 Tafssil AI — تفصيل بالذكاء الاصطناعي</h1>

<p align="center">
  <b>AI-Powered Tailoring Application</b><br/>
  Generate precise clothing measurements and sewing patterns from uploaded images
</p>

<hr/>

## 🚀 Live Demo

| Service | URL | Status |
|---------|-----|--------|
| **API (Render)** | [`https://tafssil-api.onrender.com`](https://tafssil-api.onrender.com) | ![Status](https://img.shields.io/badge/status-live-brightgreen) |
| **Health Check** | [`https://tafssil-api.onrender.com/health`](https://tafssil-api.onrender.com/health) | ![Health](https://img.shields.io/badge/health-ok-brightgreen) |
| **Source Code** | [`github.com/saidtechnology/Tafssil-AI`](https://github.com/saidtechnology/Tafssil-AI) | ![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github) |

---

## ✨ Features

- 📸 **Multi-image capture** — Take or upload up to 5 photos per garment model
- 🤖 **AI body measurement** — Automatic extraction via **MediaPipe Pose** (33 body landmarks)
- 📏 **International standard sizes** — Quick selection: `S · M · L · XL · 2XL · 3XL · 4XL`
- ✏️ **Custom measurements** — Manual input with 11 measurement fields + AI fallback
- 👗 **Simple patterns (10 models)** — A-Line, Bodycon, Shirt, Trousers, Skirt, Blouse, Blazer, Abaya, Kaftan, Wedding Dress
- 🎨 **Professional patterns** — Fully customizable: neckline, sleeve, length, fit, collar, waistline
- 📐 **SVG pattern preview** — Scaled patterns with dimension labels on every piece
- 💡 **AI recommendations** — Fabric suggestions, fit adjustments, and professional notes
- 📄 **PDF report export** — Complete project summary with all measurements and patterns

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    React Native (Expo) App                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ Camera/  │ │Measure-  │ │Pattern   │ │AI Notes  │ │ PDF  │ │
│  │ Gallery  │ │ments     │ │Generator │ │          │ │Report│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
└──────────────────────────┬──────────────────────────────────────┘
                           │ API (REST / JSON)
┌──────────────────────────▼──────────────────────────────────────┐
│                    FastAPI (Python 3.13)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ │
│  │ MediaPipe│ │  OpenCV  │ │Pattern   │ │  Ollama  │ │ PDF  │ │
│  │  Pose    │ │  Image   │ │Engine    │ │AI Notes  │ │Gen   │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| 📱 **Mobile** | React Native 0.85 + Expo 55 | Cross-platform iOS & Android |
| 🗺️ **Routing** | Expo Router (file-based) | Screen navigation |
| 🎨 **Graphics** | react-native-svg | Pattern rendering with dimensions |
| ⚙️ **Backend** | FastAPI 0.136 + Python 3.13 | REST API server |
| 🗄️ **Database** | PostgreSQL (Supabase) | Project & measurement storage |
| 🖼️ **Storage** | Supabase Storage | Garment image hosting |
| 🤖 **AI — Pose** | MediaPipe 0.10 | 33-point body landmark detection |
| 👁️ **CV** | OpenCV 4.13 | Image processing, perspective correction |
| 🧠 **AI — Notes** | Ollama + DeepSeek (optional) | Smart recommendations |
| 📄 **PDF** | WeasyPrint 68 | Report generation |
| 🔄 **Async** | Celery + Redis (optional) | Background task processing |

---

## 📁 Project Structure

```
Tafssil-AI/
├── backend/                    # FastAPI server
│   ├── app/
│   │   ├── main.py            # API entry point
│   │   ├── config.py          # Environment config
│   │   ├── database.py        # Database connection
│   │   ├── supabase_client.py # Supabase storage client
│   │   ├── routers/           # API endpoints
│   │   │   ├── projects.py    # CRUD projects
│   │   │   ├── measurements.py# Manual + AI + standard sizes
│   │   │   ├── patterns.py    # Pattern generation
│   │   │   └── reports.py     # PDF reports
│   │   ├── services/          # Business logic
│   │   │   ├── pose_estimator.py    # MediaPipe wrapper
│   │   │   ├── measurement_calc.py  # Size tables + body calc
│   │   │   ├── pattern_engine/      # SVG pattern generation
│   │   │   │   ├── simple_patterns.py   # 10 predefined models
│   │   │   │   └── pro_patterns.py      # Dynamic parameter-based
│   │   │   ├── image_processor.py # OpenCV pipeline
│   │   │   ├── ai_notes.py        # LLM integration
│   │   │   └── pdf_generator.py   # WeasyPrint PDF
│   │   ├── models/           # SQLAlchemy models
│   │   └── schemas/          # Pydantic validation
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                   # React Native (Expo)
│   ├── app/                   # Expo Router screens
│   │   ├── index.tsx          # Home — saved projects
│   │   ├── new-project/       # Camera & Gallery
│   │   ├── measurements/      # Manual, AI, Standard Sizes
│   │   ├── patterns/          # Simple & Professional
│   │   ├── preview.tsx        # SVG pattern viewer
│   │   ├── notes.tsx          # AI recommendations
│   │   └── report.tsx         # Final PDF preview
│   ├── components/            # Reusable UI
│   ├── services/api.ts        # Axios HTTP client
│   ├── constants/             # Size tables, pattern metadata
│   └── package.json
│
├── render.yaml                # Render deployment config
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

---

## 🚦 Getting Started

### Prerequisites

```bash
# System requirements
Python >= 3.13
Node.js >= 22
npm >= 11
```

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/saidtechnology/Tafssil-AI.git
cd Tafssil-AI/backend

# 2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Edit .env with your Supabase credentials (optional for local dev)

# 5. Start the server
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
# 1. Navigate to frontend directory
cd Tafssil-AI/frontend

# 2. Install dependencies
npm install

# 3. Start Expo development server
npx expo start
# Scan QR code with Expo Go app on your phone
```

### AI Notes (Optional)

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull the model
ollama pull deepseek-r1:7b
```

---

## ☁️ Production Deployment

### On Render (automatic via Blueprint)

1. Fork/clone this repo to your GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **New +** → **Blueprint**
4. Connect your `Tafssil-AI` repository
5. Render automatically reads `render.yaml` and creates:
   - ✅ Web Service (FastAPI)
   - ✅ PostgreSQL database
   - ✅ Redis instance
6. Add these **Environment Variables** in Render Dashboard:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://your-project.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `sb_secret_your_service_key` |
| `DATABASE_URL` | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres?sslmode=require` |

### Database Schema (Supabase)

Run this SQL in Supabase **SQL Editor**:

```sql
-- Tafssil AI Database Schema
CREATE TABLE IF NOT EXISTS public.projects (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'draft',
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.measurements (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES public.projects(id) ON DELETE CASCADE,
    source TEXT DEFAULT 'manual',
    height FLOAT,
    chest FLOAT,
    waist FLOAT,
    hips FLOAT,
    shoulder_width FLOAT,
    arm_length FLOAT,
    inseam FLOAT,
    neck FLOAT,
    back_width FLOAT,
    bicep FLOAT,
    wrist FLOAT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_measurements_project ON public.measurements(project_id);
```

Also create a **Storage Bucket** named `garment-images` (public).

---

## 📡 API Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `GET` | `/api/projects/` | List all projects |
| `POST` | `/api/projects/` | Create new project |
| `GET` | `/api/projects/{id}` | Get project details |
| `POST` | `/api/projects/{id}/images` | Upload garment images |
| `DELETE` | `/api/projects/{id}` | Delete project |
| `POST` | `/api/measurements/manual` | Save manual measurements |
| `POST` | `/api/measurements/standard` | Get standard size table |
| `POST` | `/api/measurements/ai-detect/{id}` | AI auto-detect measurements |
| `POST` | `/api/patterns/simple` | Generate simple pattern |
| `POST` | `/api/patterns/professional` | Generate professional pattern |
| `GET` | `/api/patterns/models` | List available pattern models |
| `GET` | `/api/reports/{id}` | Get project report |
| `GET` | `/api/reports/{id}/pdf` | Download PDF report |

### Example: Health Check

```bash
curl https://tafssil-api.onrender.com/health
# Response: {"status":"ok","app":"Tafssil AI","version":"0.1.0"}
```

### Example: Standard Sizes

```bash
curl -X POST https://tafssil-api.onrender.com/api/measurements/standard \
  -H "Content-Type: application/json" \
  -d '{"size": "L", "gender": "unisex"}'
```

### Example: Generate Simple Pattern

```bash
curl -X POST https://tafssil-api.onrender.com/api/patterns/simple \
  -H "Content-Type: application/json" \
  -d '{"pattern_type":"simple","model":"a-line","measurements":{"chest":94,"waist":80}}'
```

---

## 👤 User Flow

```
Home
├── [New Project]
│   ├── Camera (2-5 photos)
│   └── Gallery Upload
├── [Measurements]
│   ├── Standard Sizes (S-4XL)          ← One tap fills all
│   ├── Custom Manual (11 fields)       ← Full control
│   └── AI Auto-Detect (MediaPipe)      ← From uploaded photos
├── [Pattern Type]
│   ├── Simple (10 predefined models)
│   └── Professional (custom parameters)
├── [SVG Preview]                       ← Zoomable, with dimensions
├── [AI Notes + Recommendations]
└── [PDF Report]                        ← Download / Share
```

---

## 📐 Standard Size Reference (ISO 8559)

| Size | Chest | Waist | Hips | Shoulder | Arm | Inseam | Neck |
|------|-------|-------|------|----------|-----|--------|------|
| **S** | 88 cm | 74 cm | 94 cm | 40 cm | 58 cm | 76 cm | 37 cm |
| **M** | 94 cm | 80 cm | 100 cm | 42 cm | 60 cm | 78 cm | 39 cm |
| **L** | 100 cm | 86 cm | 106 cm | 44 cm | 62 cm | 80 cm | 41 cm |
| **XL** | 106 cm | 92 cm | 112 cm | 46 cm | 63 cm | 82 cm | 43 cm |
| **2XL** | 112 cm | 98 cm | 118 cm | 48 cm | 64 cm | 83 cm | 45 cm |
| **3XL** | 118 cm | 104 cm | 124 cm | 50 cm | 65 cm | 84 cm | 47 cm |
| **4XL** | 124 cm | 110 cm | 130 cm | 52 cm | 66 cm | 85 cm | 49 cm |

---

## 🧪 Testing

```bash
# Backend tests (coming soon)
# pytest backend/tests/

# Frontend lint
cd frontend && npx tsc --noEmit
```

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📄 License

This project is **MIT Licensed** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [MediaPipe](https://mediapipe.dev) by Google — Pose estimation
- [FastAPI](https://fastapi.tiangolo.com) — Python web framework
- [Expo](https://expo.dev) — React Native toolchain
- [Supabase](https://supabase.com) — Open source Firebase alternative

---

<div align="center">
  <sub>Built with ❤️ for tailors everywhere | <b>تفصيل AI</b></sub>
  <br/>
  <img src="https://img.shields.io/github/last-commit/saidtechnology/Tafssil-AI?style=flat-square"/>
  <img src="https://img.shields.io/github/repo-size/saidtechnology/Tafssil-AI?style=flat-square"/>
  <img src="https://img.shields.io/github/issues/saidtechnology/Tafssil-AI?style=flat-square"/>
</div>
