from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from app.models.project import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    source = Column(String(50), default="manual")
    height = Column(Float)
    chest = Column(Float)
    waist = Column(Float)
    hips = Column(Float)
    shoulder_width = Column(Float)
    arm_length = Column(Float)
    inseam = Column(Float)
    neck = Column(Float)
    back_width = Column(Float)
    bicep = Column(Float)
    wrist = Column(Float)
    notes = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
