from .shirt import ShirtGenerator
from .abaya import AbayaGenerator
from .kaftan import KaftanGenerator
from .base_pattern import BasePattern


PATTERN_REGISTRY = {
    "shirt": ShirtGenerator,
    "abaya": AbayaGenerator,
    "kaftan": KaftanGenerator,
}

PATTERN_META = {
    "shirt": {
        "name": "قميص كلاسيك",
        "name_en": "Classic Shirt",
        "icon": "shirt-outline",
        "required_measurements": ["chest", "waist", "hips", "shoulder_width", "arm_length", "neck", "bicep", "wrist", "shirt_length"],
    },
    "abaya": {
        "name": "عباية",
        "name_en": "Abaya",
        "icon": "accessibility-outline",
        "required_measurements": ["chest", "waist", "hips", "shoulder_width", "arm_length", "height"],
    },
    "kaftan": {
        "name": "قفطان",
        "name_en": "Kaftan",
        "icon": "accessibility-outline",
        "required_measurements": ["chest", "waist", "hips", "shoulder_width", "arm_length", "height"],
    },
}


def generate_pattern(pattern_type: str, measurements: dict, parameters: dict = None) -> str:
    cls = PATTERN_REGISTRY.get(pattern_type)
    if not cls:
        raise ValueError(f"Unknown pattern type: {pattern_type}")

    if pattern_type == "kaftan":
        sil = (parameters or {}).get("silhouette", "A-line")
        slv = (parameters or {}).get("sleeve_type", "wide")
        nck = (parameters or {}).get("neckline", "V")
        gen = cls(measurements, silhouette=sil, sleeve_type=slv, neckline=nck)
    else:
        gen = cls(measurements)

    return gen.generate()


def list_patterns() -> list:
    return [
        {"id": k, **v}
        for k, v in PATTERN_META.items()
    ]
