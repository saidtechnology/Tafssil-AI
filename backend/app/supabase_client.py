from supabase import create_client
from app.config import settings

_supabase = None


def get_supabase():
    global _supabase
    if _supabase is None and settings.supabase_url and settings.supabase_service_key:
        _supabase = create_client(settings.supabase_url, settings.supabase_service_key)
    return _supabase
