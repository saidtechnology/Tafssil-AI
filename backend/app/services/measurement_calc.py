from typing import Dict


LANDMARK_MAP = {
    "nose": 0,
    "left_eye_inner": 1, "left_eye": 2, "left_eye_outer": 3,
    "right_eye_inner": 4, "right_eye": 5, "right_eye_outer": 6,
    "left_ear": 7, "right_ear": 8,
    "mouth_left": 9, "mouth_right": 10,
    "left_shoulder": 11, "right_shoulder": 12,
    "left_elbow": 13, "right_elbow": 14,
    "left_wrist": 15, "right_wrist": 16,
    "left_pinky": 17, "right_pinky": 18,
    "left_index": 19, "right_index": 20,
    "left_thumb": 21, "right_thumb": 22,
    "left_hip": 23, "right_hip": 24,
    "left_knee": 25, "right_knee": 26,
    "left_ankle": 27, "right_ankle": 28,
    "left_heel": 29, "right_heel": 30,
    "left_foot_index": 31, "right_foot_index": 32,
}


STANDARD_SIZES = {
    "S": {"chest": 88, "waist": 74, "hips": 94, "shoulder": 40, "arm_length": 58, "inseam": 76, "neck": 37, "bicep": 28, "wrist": 15},
    "M": {"chest": 94, "waist": 80, "hips": 100, "shoulder": 42, "arm_length": 60, "inseam": 78, "neck": 39, "bicep": 30, "wrist": 16},
    "L": {"chest": 100, "waist": 86, "hips": 106, "shoulder": 44, "arm_length": 62, "inseam": 80, "neck": 41, "bicep": 32, "wrist": 17},
    "XL": {"chest": 106, "waist": 92, "hips": 112, "shoulder": 46, "arm_length": 63, "inseam": 82, "neck": 43, "bicep": 34, "wrist": 18},
    "2XL": {"chest": 112, "waist": 98, "hips": 118, "shoulder": 48, "arm_length": 64, "inseam": 83, "neck": 45, "bicep": 36, "wrist": 19},
    "3XL": {"chest": 118, "waist": 104, "hips": 124, "shoulder": 50, "arm_length": 65, "inseam": 84, "neck": 47, "bicep": 38, "wrist": 20},
    "4XL": {"chest": 124, "waist": 110, "hips": 130, "shoulder": 52, "arm_length": 66, "inseam": 85, "neck": 49, "bicep": 40, "wrist": 21},
}


def keypoints_to_measurements(keypoints: Dict, height_cm: float) -> Dict:
    top = keypoints.get(LANDMARK_MAP["nose"], {}).get("y", 0)
    bot = keypoints.get(LANDMARK_MAP["left_ankle"], {}).get("y", 0)
    body_height_pixels = abs(bot - top)
    if body_height_pixels == 0:
        return {}
    scale = height_cm / body_height_pixels
    return {
        "height": height_cm,
        "shoulder_width_cm": _distance(keypoints, 11, 12) * scale,
        "chest_cm": _distance(keypoints, 11, 23) * scale,
        "arm_length_cm": _distance(keypoints, 11, 15) * scale,
    }


def get_standard_size(size_key: str) -> Dict:
    return STANDARD_SIZES.get(size_key, {})


def _distance(kp: Dict, a: int, b: int) -> float:
    if a not in kp or b not in kp:
        return 0.0
    dx = kp[a]["x"] - kp[b]["x"]
    dy = kp[a]["y"] - kp[b]["y"]
    return (dx ** 2 + dy ** 2) ** 0.5
