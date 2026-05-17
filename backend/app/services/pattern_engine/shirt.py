from typing import Dict
from .base_pattern import BasePattern, SVGPath


class ShirtGenerator(BasePattern):
    def __init__(self, measurements: Dict[str, float]):
        super().__init__(measurements, "Classic Shirt")

    def generate(self) -> str:
        m = self.m
        chest = m.get("chest", 94)
        waist = m.get("waist", 80)
        hips = m.get("hips", 100)
        shoulder = m.get("shoulder_width", 42)
        arm_len = m.get("arm_length", 60)
        neck = m.get("neck", 39)
        bicep = m.get("bicep", 30)
        wrist = m.get("wrist", 16)
        back_w = m.get("back_width", 36)
        shirt_len = m.get("shirt_length", 75)
        height_val = m.get("height", 170)

        ease_body = 4
        half_chest = chest / 2 + ease_body
        half_waist = waist / 2 + ease_body
        half_hips = hips / 2 + ease_body

        neck_w = neck / 6 + 1
        neck_d = neck / 10 + 2
        neck_b_d = neck / 12 + 1

        armhole_d = chest / 8 + 6

        half_shoulder = shoulder / 2 + 1
        back_half = back_w / 2 + 0.5

        sleeveless_gap = 2
        sleeve_cap = armhole_d * 0.7
        sleeve_w = (bicep + 6) / 2
        cuff_w = (wrist + 4) / 2

        self.vp_y = 30

        # ── Front ──
        front_w = half_chest
        p = SVGPath()
        p.M(0, neck_d)
        p.L(0, shirt_len)
        p.L(front_w, shirt_len)
        waist_y = shirt_len * 0.45
        chest_y = armhole_d
        p.L(front_w, chest_y)

        arm = self._bezier_armhole(
            half_shoulder + sleeveless_gap, neck_d,
            half_shoulder + sleeveless_gap + 2, chest_y + armhole_d * 0.6,
            front_w, chest_y,
        )
        arm_path = str(arm).replace("M", "")
        p2 = SVGPath().M(half_shoulder + sleeveless_gap, neck_d)
        p2.C(
            half_shoulder + sleeveless_gap + 2, neck_d + armhole_d * 0.3,
            half_shoulder + sleeveless_gap + 1, chest_y + armhole_d * 0.4,
            half_shoulder + sleeveless_gap + 2, chest_y + armhole_d * 0.6,
        )
        p2.L(front_w, chest_y)

        combined_path = SVGPath() \
            .M(0, neck_d) \
            .L(0, shirt_len) \
            .L(front_w, shirt_len) \
            .L(front_w, chest_y) \
            .C(
                front_w - 2, chest_y + armhole_d * 0.4,
                half_shoulder + sleeveless_gap + 2, chest_y + armhole_d * 0.6,
                half_shoulder + sleeveless_gap, neck_d + armhole_d * 0.6,
            ) \
            .L(half_shoulder + sleeveless_gap, neck_d)
        neckline = self._bezier_neckline(neck_w, 0, 0, neck_d, depth=neck_d * 0.3)
        combined_path.d.append(neckline.__str__().replace("M", ""))
        combined_path.Z()

        self.add_piece("الأمامي (Front)", combined_path, "#e94560")

        self.add_dimension(0, 0, front_w, 0, f"نصف الصدر: {front_w:.0f} cm")
        self.add_dimension(0, shirt_len, 0, 0, f"الطول: {shirt_len:.0f} cm")
        self.add_dimension(0, neck_d, neck_w, 0, f"رقبة: {neck_w:.0f} cm")
        self.add_dimension(
            half_shoulder + sleeveless_gap, neck_d,
            front_w, chest_y,
            f"فتحة إبط: {armhole_d:.0f} cm",
        )
        self.add_notch(half_shoulder + sleeveless_gap, neck_d + armhole_d * 0.3)
        self.add_grainline(front_w * 0.3, shirt_len * 0.5)

        # ── Back ──
        bx = 0
        by = shirt_len + 40
        back_path = SVGPath() \
            .M(bx + neck_w * 0.5, by + neck_b_d) \
            .L(bx, by + shirt_len) \
            .L(bx + half_chest, by + shirt_len) \
            .L(bx + half_chest, by + armhole_d) \
            .C(
                bx + half_chest - 2, by + armhole_d * 0.5,
                bx + half_shoulder + 2, by + armhole_d * 0.7,
                bx + half_shoulder, by + neck_b_d + armhole_d * 0.5,
            ) \
            .L(bx + half_shoulder, by + neck_b_d)
        back_neck = self._bezier_neckline(
            bx + neck_w * 0.5, by + neck_b_d,
            bx, by + neck_b_d + 1,
            depth=neck_b_d * 0.2,
        )
        back_path.d.append(back_neck.__str__().replace("M", ""))
        back_path.Z()

        self.add_piece("الخلفي (Back)", back_path, "#4fc3f7")
        self.add_dimension(
            bx + half_chest, by + shirt_len,
            bx + half_chest, by + armhole_d,
            f"طول: {shirt_len - armhole_d:.0f} cm",
        )

        # ── Sleeve ──
        sx = half_chest + 30
        sy = 0
        sleeve_len = arm_len
        sleeve_path = SVGPath() \
            .M(sx, sy) \
            .L(sx, sy + sleeve_len) \
            .L(sx + cuff_w, sy + sleeve_len) \
            .L(sx + sleeve_w, sy + sleeve_cap) \
            .C(
                sx + sleeve_w - 1, sy + sleeve_cap * 0.6,
                sx + sleeve_w * 0.7, sy + sleeve_cap * 0.3,
                sx, sy,
            )
        sleeve_path.Z()

        self.add_piece("الكم (Sleeve)", sleeve_path, "#ffd700")
        self.add_dimension(sx, sy, sx, sy + sleeve_len, f"طول الكم: {sleeve_len:.0f} cm")
        self.add_dimension(sx, sy, sx + sleeve_w, sy, f"عرض الكم: {sleeve_w:.0f} cm")
        self.add_notch(sx + sleeve_w * 0.5, sy + sleeve_cap * 0.5)
        self.add_grainline(sx + 2, sy + sleeve_len * 0.5)

        # ── Collar ──
        cx = sx + sleeve_w + 20
        cy = 0
        collar_len = neck + 2
        collar_w = 5
        collar_path = SVGPath() \
            .M(cx, cy) \
            .L(cx, cy + collar_w * 1.5) \
            .C(
                cx + collar_len * 0.3, cy + collar_w + 1,
                cx + collar_len * 0.7, cy + collar_w - 1,
                cx + collar_len, cy + collar_w * 0.5,
            ) \
            .L(cx + collar_len, cy) \
            .Z()
        self.add_piece("الياقة (Collar)", collar_path, "#ce93d8")
        self.add_dimension(cx, cy, cx + collar_len, cy, f"طول الياقة: {collar_len:.0f} cm")

        return self.to_svg(width=700, height=shirt_len + shirt_len + 60)
