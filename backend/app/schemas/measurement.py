from pydantic import BaseModel
from typing import Optional


class MeasurementCreate(BaseModel):
    height: Optional[float] = None
    chest: float
    waist: float
    hips: float
    shoulder_width: float
    arm_length: float
    inseam: float
    neck: float
    back_width: Optional[float] = None
    bicep: Optional[float] = None
    wrist: Optional[float] = None


class StandardSizeRequest(BaseModel):
    size: str  # S, M, L, XL, 2XL, 3XL, 4XL
    gender: str = "unisex"


class MeasurementResponse(BaseModel):
    id: int
    project_id: int
    source: str
    height: Optional[float]
    chest: float
    waist: float
    hips: float
    shoulder_width: float
    arm_length: float
