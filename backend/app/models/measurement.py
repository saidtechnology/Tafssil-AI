from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, func
from app.database import Base


class Measurement(Base):
    __tablename__ = "measurements"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    source = Column(String(50), default="manual")
    height = Column(Float, nullable=True)
    chest = Column(Float, nullable=True)
    waist = Column(Float, nullable=True)
    hips = Column(Float, nullable=True)
    shoulder_width = Column(Float, nullable=True)
    arm_length = Column(Float, nullable=True)
    inseam = Column(Float, nullable=True)
    neck = Column(Float, nullable=True)
    back_width = Column(Float, nullable=True)
    bicep = Column(Float, nullable=True)
    wrist = Column(Float, nullable=True)
    notes = Column(String(500))
    created_at = Column(DateTime, server_default=func.now())
