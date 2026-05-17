from typing import Dict
from .base_pattern import BasePattern, SVGPath


class KaftanGenerator(BasePattern):
    def __init__(self, measurements: Dict[str, float], silhouette: str = "A-line",
                 sleeve_type: str = "wide", neckline: str = "V"):
        super().__init__(measurements, "Kaftan")
        self.silhouette = silhouette
        self.sleeve_type = sleeve_type
        self.neckline = neckline

    def generate(self) -> str:
        m = self.m
        chest = m.get("chest", 94)
        waist = m.get("waist", 80)
        hips = m.get("hips", 100)
        shoulder = m.get("shoulder_width", 42)
        arm_len = m.get("arm_length", 60)
        height_val = m.get("height", 165)

        ease_wide = 12
        half_chest = chest / 2 + ease_wide
        half_hips = hips / 2 + ease_wide + 8
        kaftan_len = height_val * 0.78

        neck_v_depth = 16
        neck_w = m.get("neck", 39) / 6 + 1

        if self.silhouette == "straight":
            body_w = half_chest
            hem_w = half_chest
        else:
            body_w = half_chest
            hem_w = half_hips

        half_shoulder = shoulder / 2 + 2
        armhole_d = chest / 8 + 8

        if self.sleeve_type == "fitted":
            sleeve_w = (arm_len * 0.15)
        else:
            sleeve_w = arm_len * 0.35

        sleeve_len = arm_len * 0.7
        belt_w = 0

        self.vp_y = 30

        # ── Front ──
        front_path = SVGPath() \
            .M(neck_w, neck_v_depth) \
            .L(0, kaftan_len) \
            .L(hem_w, kaftan_len) \
            .L(body_w, armhole_d) \
            .C(
                body_w - 2, armhole_d + 6,
                half_shoulder + 4, armhole_d + 4,
                half_shoulder, neck_v_depth + 6,
            ) \
            .L(half_shoulder, neck_v_depth)

        if self.neckline == "V":
            front_path.L(neck_w, neck_v_depth)
        elif self.neckline == "round":
            front_path.Q(neck_w * 0.4, neck_v_depth - 4, 0, neck_v_depth - 2)
            front_path.L(neck_w, neck_v_depth)
        else:
            front_path.L(neck_w, neck_v_depth)
        front_path.Z()

        self.add_piece("الأمامي (Front)", front_path, "#e94560")
        self.add_dimension(0, 0, 0, kaftan_len, f"الطول: {kaftan_len:.0f} cm")
        self.add_dimension(0, kaftan_len, hem_w, kaftan_len, f"عرض الذيل: {hem_w:.0f} cm")
        self.add_dimension(0, 0, body_w, 0, f"عرض الصدر: {body_w:.0f} cm")
        self.add_notch(half_shoulder, neck_v_depth + 4)
        self.add_grainline(body_w * 0.4, kaftan_len * 0.45)

        # ── Back ──
        bx = hem_w + 30
        neck_b_d = 3
        back_path = SVGPath() \
            .M(bx + neck_w, neck_b_d) \
            .L(bx, kaftan_len) \
            .L(bx + hem_w, kaftan_len) \
            .L(bx + body_w, armhole_d) \
            .C(
                bx + body_w - 2, armhole_d + 6,
                bx + half_shoulder + 4, armhole_d + 4,
                bx + half_shoulder, neck_b_d + 6,
            ) \
            .L(bx + half_shoulder, neck_b_d)

        back_neck = self._bezier_neckline(
            bx + neck_w, neck_b_d,
            bx, neck_b_d + 1,
            depth=1,
        )
        back_path.d.append(back_neck.__str__().replace("M", ""))
        back_path.Z()

        self.add_piece("الخلفي (Back)", back_path, "#4fc3f7")

        # ── Sleeve ──
        sx = bx + hem_w + 20
        sy = 0
        sleeve_path = SVGPath() \
            .M(sx, sy) \
            .L(sx + sleeve_w, sy + 8) \
            .L(sx + sleeve_w, sy + sleeve_len) \
            .L(sx, sy + sleeve_len) \
            .Z()
        self.add_piece("الكم (Sleeve)", sleeve_path, "#ffd700")
        self.add_dimension(sx, sy, sx, sy + sleeve_len, f"طول الكم: {sleeve_len:.0f} cm")
        self.add_grainline(sx + 2, sy + sleeve_len * 0.5)

        # ── Belt/Sash ──
        bx2 = sx + sleeve_w + 20
        by2 = kaftan_len * 0.4
        belt_len = chest + 30
        belt_w = 12
        belt_path = SVGPath() \
            .M(bx2, by2) \
            .L(bx2, by2 + belt_w) \
            .L(bx2 + belt_len, by2 + belt_w) \
            .L(bx2 + belt_len, by2) \
            .Z()
        self.add_piece("حزام (Belt)", belt_path, "#ce93d8")
        self.add_dimension(bx2, by2, bx2 + belt_len, by2, f"طول الحزام: {belt_len:.0f} cm")

        return self.to_svg(width=bx2 + belt_len + 50, height=kaftan_len + 60)
