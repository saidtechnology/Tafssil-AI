from sqlalchemy import Column, Integer, String, DateTime, JSON, func
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    images = Column(JSON, default=list)
    status = Column(String(50), default="draft")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
