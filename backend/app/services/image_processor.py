import cv2
import numpy as np
from pathlib import Path
from typing import List


def load_images(image_paths: List[str]) -> List[np.ndarray]:
    images = []
    for path in image_paths:
        img = cv2.imread(str(path))
        if img is not None:
            images.append(img)
    return images


def merge_features(images: List[np.ndarray]) -> np.ndarray:
    if not images:
        return np.array([])
    return images[0]


def correct_perspective(image: np.ndarray) -> np.ndarray:
    return image


def detect_reference(image: np.ndarray) -> float:
    return 1.0
