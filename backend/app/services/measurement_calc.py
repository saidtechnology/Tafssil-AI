from typing import Dict
import math


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

# Moroccan-specific body measurements (average Moroccan woman)
STANDARD_SIZES = {
    "S": {"chest": 86, "waist": 70, "hips": 96, "shoulder_width": 39, "arm_length": 57, "inseam": 74, "neck": 36, "bicep": 27, "wrist": 14, "back_width": 34},
    "M": {"chest": 92, "waist": 76, "hips": 102, "shoulder_width": 41, "arm_length": 59, "inseam": 76, "neck": 38, "bicep": 29, "wrist": 15, "back_width": 36},
    "L": {"chest": 98, "waist": 82, "hips": 108, "shoulder_width": 43, "arm_length": 61, "inseam": 78, "neck": 40, "bicep": 31, "wrist": 16, "back_width": 38},
    "XL": {"chest": 104, "waist": 88, "hips": 114, "shoulder_width": 45, "arm_length": 62, "inseam": 80, "neck": 42, "bicep": 33, "wrist": 17, "back_width": 40},
    "2XL": {"chest": 110, "waist": 94, "hips": 120, "shoulder_width": 47, "arm_length": 63, "inseam": 81, "neck": 44, "bicep": 35, "wrist": 18, "back_width": 42},
    "3XL": {"chest": 116, "waist": 100, "hips": 126, "shoulder_width": 49, "arm_length": 64, "inseam": 82, "neck": 46, "bicep": 37, "wrist": 19, "back_width": 44},
    "4XL": {"chest": 122, "waist": 106, "hips": 132, "shoulder_width": 51, "arm_length": 65, "inseam": 83, "neck": 48, "bicep": 39, "wrist": 20, "back_width": 46},
}

# Ratios for estimating measurements from height (based on standard body proportions)
BODY_RATIOS = {
    "female": {
        "chest": 0.53, "waist": 0.42, "hips": 0.56, "shoulder_width": 0.25,
        "arm_length": 0.35, "inseam": 0.46, "neck": 0.22, "bicep": 0.17,
        "wrist": 0.09, "back_width": 0.22,
    },
    "male": {
        "chest": 0.56, "waist": 0.48, "hips": 0.54, "shoulder_width": 0.27,
        "arm_length": 0.36, "inseam": 0.47, "neck": 0.23, "bicep": 0.18,
        "wrist": 0.10, "back_width": 0.23,
    },
}


def keypoints_to_measurements(keypoints: Dict, height_cm: float, gender: str = "female") -> Dict:
    top = keypoints.get(LANDMARK_MAP["nose"], {}).get("y", 0)
    bot = keypoints.get(LANDMARK_MAP["left_ankle"], {}).get("y", 0)
    body_height_pixels = abs(bot - top)
    if body_height_pixels == 0:
        return measurements_from_height(height_cm, gender)
    scale = height_cm / body_height_pixels

    def dist(a: int, b: int) -> float:
        if a not in keypoints or b not in keypoints:
            return 0.0
        dx = keypoints[a]["x"] - keypoints[b]["x"]
        dy = keypoints[a]["y"] - keypoints[b]["y"]
        return math.sqrt(dx ** 2 + dy ** 2)

    shoulder_w = dist(LANDMARK_MAP["left_shoulder"], LANDMARK_MAP["right_shoulder"]) * scale
    chest_w = dist(LANDMARK_MAP["left_shoulder"], LANDMARK_MAP["left_hip"]) * scale * 1.2
    arm_len = dist(LANDMARK_MAP["left_shoulder"], LANDMARK_MAP["left_wrist"]) * scale
    inseam_len = dist(LANDMARK_MAP["left_hip"], LANDMARK_MAP["left_ankle"]) * scale
    waist_w = dist(LANDMARK_MAP["left_hip"], LANDMARK_MAP["right_hip"]) * scale * 1.1
    hips_w = waist_w * 1.2

    measurements = measurements_from_height(height_cm, gender)
    measurements.update({
        "height": height_cm,
        "shoulder_width": round(shoulder_w, 1),
        "chest": round(chest_w, 1),
        "arm_length": round(arm_len, 1),
        "inseam": round(inseam_len, 1),
        "waist": round(waist_w, 1),
        "hips": round(hips_w, 1),
    })
    return measurements


def measurements_from_height(height_cm: float, gender: str = "female") -> Dict:
    ratios = BODY_RATIOS.get(gender, BODY_RATIOS["female"])
    return {
        "height": height_cm,
        "chest": round(height_cm * ratios["chest"], 1),
        "waist": round(height_cm * ratios["waist"], 1),
        "hips": round(height_cm * ratios["hips"], 1),
        "shoulder_width": round(height_cm * ratios["shoulder_width"], 1),
        "arm_length": round(height_cm * ratios["arm_length"], 1),
        "inseam": round(height_cm * ratios["inseam"], 1),
        "neck": round(height_cm * ratios["neck"], 1),
        "bicep": round(height_cm * ratios["bicep"], 1),
        "wrist": round(height_cm * ratios["wrist"], 1),
        "back_width": round(height_cm * ratios["back_width"], 1),
        "shirt_length": round(height_cm * 0.42, 1),
    }


def get_standard_size(size_key: str) -> Dict:
    return STANDARD_SIZES.get(size_key, {})
