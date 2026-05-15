from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    database_url: str = "sqlite:///./tafssil.db"
    redis_url: str = "redis://localhost:6379/0"
    celery_broker_url: str = "redis://localhost:6379/0"
    ollama_host: str = "http://localhost:11434"
    upload_dir: str = "./static/uploads"
    log_level: str = "INFO"
    debug: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
