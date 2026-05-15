from pydantic import BaseModel
from typing import List, Optional


class ProjectCreate(BaseModel):
    name: str


class ProjectResponse(BaseModel):
    id: int
    name: str
    images: List[str]
    status: str

    class Config:
        from_attributes = True
