from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter()


@router.get("/{project_id}")
async def get_report(project_id: int):
    return {"project_id": project_id, "report_url": ""}


@router.get("/{project_id}/pdf")
async def download_pdf(project_id: int):
    return {"project_id": project_id, "filename": ""}
