from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
from pathlib import Path

from app.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
    yield


app = FastAPI(
    title="Tafssil AI",
    description="AI-powered tailoring application",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if Path(settings.upload_dir).exists():
    app.mount("/static", StaticFiles(directory=settings.upload_dir), name="static")

from app.routers import projects, measurements, patterns, reports

app.include_router(projects.router, prefix="/api/projects", tags=["projects"])
app.include_router(measurements.router, prefix="/api/measurements", tags=["measurements"])
app.include_router(patterns.router, prefix="/api/patterns", tags=["patterns"])
app.include_router(reports.router, prefix="/api/reports", tags=["reports"])


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "app": "Tafssil AI",
        "version": "0.1.0",
        "upload_dir": str(Path(settings.upload_dir).exists()),
    }
