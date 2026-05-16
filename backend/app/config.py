from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    database_url: str = "sqlite:///./tafssil.db"
    redis_url: str = ""
    supabase_url: str = ""
    supabase_service_key: str = ""
    upload_dir: str = "./static/uploads"
    log_level: str = "INFO"
    debug: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
