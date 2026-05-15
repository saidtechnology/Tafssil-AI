from fastapi import APIRouter
from app.schemas.measurement import MeasurementCreate, StandardSizeRequest

router = APIRouter()


@router.post("/manual")
async def save_manual_measurements(data: MeasurementCreate):
    return {"measurements": data, "status": "saved"}


@router.post("/standard")
async def get_standard_size(data: StandardSizeRequest):
    return {"size": data.size, "measurements": {}}


@router.post("/ai-detect/{project_id}")
async def ai_detect_measurements(project_id: int):
    return {"project_id": project_id, "measurements": {}, "confidence": 0.0}
