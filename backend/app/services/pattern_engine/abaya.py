from typing import Dict
from .base_pattern import BasePattern, SVGPath


class AbayaGenerator(BasePattern):
    def __init__(self, measurements: Dict[str, float]):
        super().__init__(measurements, "Abaya")

    def generate(self) -> str:
        m = self.m
        chest = m.get("chest", 94)
        waist = m.get("waist", 80)
        hips = m.get("hips", 100)
        shoulder = m.get("shoulder_width", 42)
        arm_len = m.get("arm_length", 60)
        height_val = m.get("height", 165)

        ease = 12
        body_w = max(chest, waist, hips) / 2 + ease
        abaya_len = height_val * 0.82

        neck_w = m.get("neck", 39) / 6 + 1.5
        neck_d = 4
        shoulder_line = shoulder / 2 + 3

        sleeve_opening = arm_len * 0.4
        side_slit = abaya_len * 0.25

        self.vp_y = 30

        # ── Main Body (Front + Back combined) ──
        body_path = SVGPath() \
            .M(neck_w, neck_d) \
            .L(0, abaya_len) \
            .L(body_w, abaya_len) \
            .L(body_w - shoulder_line + 5, 0) \
            .L(neck_w + shoulder_line - 5, 0) \
            .Z()
        self.add_piece("الجسم (Body)", body_path, "#e94560")

        self.add_dimension(0, 0, body_w, 0, f"العرض: {body_w:.0f} cm")
        self.add_dimension(0, abaya_len, 0, 0, f"الطول: {abaya_len:.0f} cm")
        self.add_dimension(0, abaya_len * 0.75, 0, abaya_len, f"شق جانبي: {side_slit:.0f} cm")
        self.add_grainline(body_w * 0.5, abaya_len * 0.4)

        # ── Neckline facing ──
        neck_path = SVGPath() \
            .M(neck_w, neck_d) \
            .Q(neck_w * 0.4, neck_d + 3, 0, neck_d + 2) \
            .L(0, neck_d) \
            .L(neck_w, neck_d) \
            .Z()
        self.add_piece("تقوية الرقبة (Neck Facing)", neck_path, "#4fc3f7")

        # ── Sleeve (Kimono style, cut as separate) ──
        sleeve_w = arm_len * 0.35
        sleeve_len = arm_len * 0.7
        sx = body_w + 20
        sy = 0
        sleeve_path = SVGPath() \
            .M(sx, sy) \
            .L(sx + sleeve_w, sy + 5) \
            .L(sx + sleeve_w, sy + sleeve_len) \
            .L(sx, sy + sleeve_len) \
            .Z()
        self.add_piece("الكم (Sleeve)", sleeve_path, "#ffd700")
        self.add_dimension(sx, sy, sx, sy + sleeve_len, f"طول الكم: {sleeve_len:.0f} cm")
        self.add_dimension(sx, sy, sx + sleeve_w, sy, f"عرض الكم: {sleeve_w:.0f} cm")
        self.add_grainline(sx + sleeve_w * 0.3, sy + sleeve_len * 0.5)

        return self.to_svg(width=body_w + sleeve_w + 80, height=abaya_len + 60)
