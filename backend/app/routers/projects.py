from fastapi import APIRouter, UploadFile, File, Depends
from typing import List

router = APIRouter()


@router.get("/")
async def list_projects():
    return {"projects": []}


@router.post("/")
async def create_project(name: str):
    return {"project": {"id": 1, "name": name, "images": []}}


@router.get("/{project_id}")
async def get_project(project_id: int):
    return {"project": {"id": project_id}}


@router.post("/{project_id}/images")
async def upload_images(project_id: int, files: List[UploadFile] = File(...)):
    return {"uploaded": len(files), "project_id": project_id}


@router.delete("/{project_id}")
async def delete_project(project_id: int):
    return {"deleted": project_id}
