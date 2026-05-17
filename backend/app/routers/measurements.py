from fastapi import APIRouter
from app.schemas.measurement import MeasurementCreate, StandardSizeRequest, MeasurementResponse
from app.services.measurement_calc import get_standard_size, STANDARD_SIZES

router = APIRouter()


@router.post("/manual")
async def save_manual_measurements(data: MeasurementCreate):
    derived = {}
    if data.height:
        derived = _derive_from_height(data.height, data.chest)
    return {
        "measurements": data.model_dump(),
        "derived": derived,
        "status": "saved",
    }


@router.post("/standard")
async def get_standard_size_endpoint(data: StandardSizeRequest):
    sizes = get_standard_size(data.size) or {}
    return {
        "size": data.size,
        "gender": data.gender,
        "measurements": sizes,
    }


@router.post("/ai-detect/{project_id}")
async def ai_detect_measurements(project_id: int):
    return {
        "project_id": project_id,
        "measurements": {},
        "confidence": 0.0,
        "message": "AI measurement detection will be available in a future update.",
    }


@router.get("/sizes")
async def list_standard_sizes():
    return {"sizes": list(STANDARD_SIZES.keys()), "data": STANDARD_SIZES}


def _derive_from_height(height: float, chest: float) -> dict:
    ratio = chest / height if height else 0.53
    return {
        "estimated_waist": round(height * 0.42, 1),
        "estimated_hips": round(height * 0.56, 1),
        "estimated_shoulder": round(height * 0.25, 1),
        "estimated_arm_length": round(height * 0.35, 1),
        "estimated_inseam": round(height * 0.46, 1),
    }
