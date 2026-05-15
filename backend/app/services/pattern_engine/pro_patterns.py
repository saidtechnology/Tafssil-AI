from typing import Dict


class ProfessionalPatternGenerator:
    def __init__(self):
        self.parameters = [
            "neckline", "sleeve_type", "sleeve_length",
            "dress_length", "fit_type", "waist_line",
            "silhouette", "collar_type",
        ]

    def generate(self, parameters: Dict, measurements: Dict) -> str:
        svg = f'<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">'
        svg += f'<text x="20" y="30" font-size="14" font-weight="bold">Professional Pattern</text>'
        svg += f'<text x="20" y="50" font-size="12">Neckline: {parameters.get("neckline", "default")}</text>'
        svg += f'<rect x="50" y="80" width="{measurements.get("chest", 100)}" height="300" fill="none" stroke="black" stroke-width="2"/>'
        svg += '</svg>'
        return svg
