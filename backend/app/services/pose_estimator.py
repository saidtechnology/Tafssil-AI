import mediapipe as mp
import cv2
import numpy as np
from typing import List, Dict, Optional


class PoseEstimator:
    def __init__(self):
        self.pose = mp.solutions.pose.Pose(
            static_image_mode=True,
            model_complexity=2,
            min_detection_confidence=0.5,
        )

    def extract_keypoints(self, image: np.ndarray) -> Optional[Dict]:
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        results = self.pose.process(rgb)
        if not results.pose_landmarks:
            return None
        landmarks = {}
        for idx, lm in enumerate(results.pose_landmarks.landmark):
            landmarks[idx] = {"x": lm.x, "y": lm.y, "z": lm.z, "visibility": lm.visibility}
        return landmarks

    def average_keypoints(self, all_keypoints: List[Dict]) -> Dict:
        if not all_keypoints:
            return {}
        averaged = {}
        for key in all_keypoints[0]:
            vals = [kp[key] for kp in all_keypoints if key in kp]
            averaged[key] = {
                "x": sum(v["x"] for v in vals) / len(vals),
                "y": sum(v["y"] for v in vals) / len(vals),
                "z": sum(v["z"] for v in vals) / len(vals),
                "visibility": sum(v["visibility"] for v in vals) / len(vals),
            }
        return averaged

    def close(self):
        self.pose.close()
