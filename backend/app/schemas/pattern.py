from pydantic import BaseModel
from typing import Dict, Optional


class PatternRequest(BaseModel):
    pattern_type: str  # simple / professional
    model: str
    measurements: Dict[str, float]
    parameters: Optional[Dict] = None


class PatternResponse(BaseModel):
    svg: str
    pattern_type: str
    model: str
    measurements_used: Dict[str, float]
