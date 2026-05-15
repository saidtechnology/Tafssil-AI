from typing import Dict


PATTERN_MODELS = [
    "a-line-dress", "bodycon-dress", "classic-shirt",
    "trousers", "skirt", "blouse", "blazer",
    "abaya", "kaftan", "basic-wedding-dress",
]


class SimplePatternGenerator:
    def __init__(self):
        self.models = PATTERN_MODELS

    def generate(self, model: str, measurements: Dict) -> str:
        # Returns SVG string with pattern drawn to scale
        svg = f'<svg width="500" height="700" xmlns="http://www.w3.org/2000/svg">'
        svg += f'<rect x="50" y="50" width="{measurements.get("chest", 100)}" height="200" fill="none" stroke="black" stroke-width="2"/>'
        svg += f'<text x="60" y="70" font-size="12">{measurements.get("chest", 0)} cm</text>'
        svg += '</svg>'
        return svg
