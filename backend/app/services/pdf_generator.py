from typing import Dict
from pathlib import Path
from weasyprint import HTML


def generate_report(project_data: Dict, output_path: str) -> str:
    html = _build_html(project_data)
    HTML(string=html).write_pdf(output_path)
    return output_path


def _build_html(data: Dict) -> str:
    measurements = data.get("measurements", {})
    notes = data.get("notes", "")
    svg_pattern = data.get("pattern_svg", "")

    return f"""
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: 'Arial', sans-serif; padding: 20px; }}
            h1 {{ color: #1a1a2e; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th, td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
            .pattern {{ margin: 20px 0; }}
        </style>
    </head>
    <body>
        <h1>Tafssil AI — تقرير التفصيل</h1>
        <h2>القياسات</h2>
        <table>
            <tr><th>القياس</th><th>القيمة</th></tr>
            {"".join(f'<tr><td>{k}</td><td>{v}</td></tr>' for k, v in measurements.items())}
        </table>
        <div class="pattern">
            <h2>الباترون</h2>
            {svg_pattern}
        </div>
        <div class="notes">
            <h2>الملاحظات</h2>
            <p>{notes}</p>
        </div>
    </body>
    </html>
    """
