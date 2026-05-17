from fastapi import APIRouter, HTTPException
from app.schemas.pattern import PatternRequest, PatternResponse
from app.services.pattern_engine import generate_pattern, list_patterns

router = APIRouter()


@router.post("/simple")
async def generate_simple_pattern(data: PatternRequest):
    try:
        svg = generate_pattern(data.model, data.measurements, data.parameters)
        return PatternResponse(
            svg=svg,
            pattern_type=data.pattern_type,
            model=data.model,
            measurements_used=data.measurements,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/professional")
async def generate_professional_pattern(data: PatternRequest):
    try:
        svg = generate_pattern(data.model, data.measurements, data.parameters)
        return PatternResponse(
            svg=svg,
            pattern_type="professional",
            model=data.model,
            measurements_used=data.measurements,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/models")
async def list_available_models():
    models = list_patterns()
    return {"models": models}
