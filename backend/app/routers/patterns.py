from fastapi import APIRouter
from app.schemas.pattern import PatternRequest

router = APIRouter()


@router.post("/simple")
async def generate_simple_pattern(data: PatternRequest):
    return {"pattern_type": data.pattern_type, "svg": "", "measurements_used": data.measurements}


@router.post("/professional")
async def generate_professional_pattern(data: PatternRequest):
    return {"pattern_type": "professional", "parameters": data.parameters, "svg": ""}


@router.get("/models")
async def list_models():
    return {"models": []}
