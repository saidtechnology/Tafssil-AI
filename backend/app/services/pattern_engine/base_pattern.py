from typing import Dict, List, Tuple
import math

Pt = Tuple[float, float]


class SVGPath:
    def __init__(self):
        self.d = []

    def M(self, x: float, y: float) -> "SVGPath":
        self.d.append(f"M{x:.1f},{y:.1f}")
        return self

    def L(self, x: float, y: float) -> "SVGPath":
        self.d.append(f"L{x:.1f},{y:.1f}")
        return self

    def Q(self, cx: float, cy: float, x: float, y: float) -> "SVGPath":
        self.d.append(f"Q{cx:.1f},{cy:.1f} {x:.1f},{y:.1f}")
        return self

    def C(self, c1x: float, c1y: float, c2x: float, c2y: float, x: float, y: float) -> "SVGPath":
        self.d.append(f"C{c1x:.1f},{c1y:.1f} {c2x:.1f},{c2y:.1f} {x:.1f},{y:.1f}")
        return self

    def arc(self, rx: float, ry: float, x_axis_rot: float, large: int, sweep: int, x: float, y: float) -> "SVGPath":
        self.d.append(f"A{rx:.1f},{ry:.1f} {x_axis_rot} {large},{sweep} {x:.1f},{y:.1f}")
        return self

    def Z(self) -> "SVGPath":
        self.d.append("Z")
        return self

    def __str__(self) -> str:
        return " ".join(self.d)


class BasePattern:
    def __init__(self, measurements: Dict[str, float], label: str = ""):
        self.m = measurements
        self.label = label
        self.pieces: List[Dict] = []
        self.annotations: List[str] = []
        self.vp_x = 50
        self.vp_y = 50

    def _g(self, x: float) -> float:
        return x + self.vp_x

    def _h(self, y: float) -> float:
        return y + self.vp_y

    def _measure(self, key: str, default: float = 0) -> float:
        return self.m.get(key, default)

    def add_piece(self, name: str, path: SVGPath, color: str = "#e94560", fill: str = "none") -> None:
        self.pieces.append({
            "name": name,
            "path": str(path),
            "color": color,
            "fill": fill,
        })

    def add_annotation(self, x: float, y: float, text: str, color: str = "#ffffff", font_size: int = 11) -> None:
        self.annotations.append(
            f'<text x="{self._g(x):.1f}" y="{self._h(y):.1f}" fill="{color}" font-size="{font_size}" '
            f'font-family="sans-serif" text-anchor="middle">{text}</text>'
        )

    def add_dimension(self, x1: float, y1: float, x2: float, y2: float, label: str) -> None:
        mid_x = (x1 + x2) / 2
        mid_y = (y1 + y2) / 2
        self.annotations.append(
            f'<line x1="{self._g(x1):.1f}" y1="{self._h(y1):.1f}" '
            f'x2="{self._g(x2):.1f}" y2="{self._h(y2):.1f}" '
            f'stroke="#64ffda" stroke-width="1" stroke-dasharray="4,3"/>'
        )
        self.annotations.append(
            f'<text x="{self._g(mid_x):.1f}" y="{self._h(mid_y - 5):.1f}" '
            f'fill="#64ffda" font-size="10" font-family="sans-serif" text-anchor="middle">{label}</text>'
        )

    def add_notch(self, x: float, y: float, size: float = 6) -> None:
        self.annotations.append(
            f'<line x1="{self._g(x - size):.1f}" y1="{self._h(y):.1f}" '
            f'x2="{self._g(x + size):.1f}" y2="{self._h(y):.1f}" '
            f'stroke="#ffd700" stroke-width="2"/>'
        )

    def add_grainline(self, x: float, y: float, length: float = 30) -> None:
        top = y - length / 2
        bot = y + length / 2
        arr = 5
        self.annotations.append(
            f'<line x1="{self._g(x):.1f}" y1="{self._h(top):.1f}" '
            f'x2="{self._g(x):.1f}" y2="{self._h(bot):.1f}" '
            f'stroke="#aaa" stroke-width="1.5" stroke-dasharray="2,2"/>'
        )
        for yy in (top, bot):
            self.annotations.append(
                f'<line x1="{self._g(x - arr):.1f}" y1="{self._h(yy):.1f}" '
                f'x2="{self._g(x + arr):.1f}" y2="{self._h(yy):.1f}" '
                f'stroke="#aaa" stroke-width="1.5"/>'
            )

    def to_svg(self, width: int = 600, height: int = 700) -> str:
        svg_w = width
        svg_h = height
        parts = [
            f'<svg width="{svg_w}" height="{svg_h}" viewBox="0 0 {svg_w} {svg_h}" '
            f'xmlns="http://www.w3.org/2000/svg" style="background:#1a1a2e;border-radius:12px">',
            f'<rect width="{svg_w}" height="{svg_h}" fill="#1a1a2e" rx="12"/>',
        ]
        for piece in self.pieces:
            parts.append(
                f'<path d="{piece["path"]}" fill="{piece["fill"]}" stroke="{piece["color"]}" '
                f'stroke-width="2" stroke-linejoin="round"/>'
            )
            parts.append(
                f'<text x="20" y="20" fill="{piece["color"]}" font-size="12" '
                f'font-family="sans-serif" font-weight="bold">{piece["name"]}</text>'
            )
        parts.extend(self.annotations)
        parts.append("</svg>")
        return "\n".join(parts)

    @staticmethod
    def _bezier_armhole(
        ax: float, ay: float,
        bx: float, by: float,
        cx: float, cy: float,
    ) -> SVGPath:
        p = SVGPath().M(ax, ay)
        ctrl1_x = ax + (bx - ax) * 0.3
        ctrl1_y = ay + (by - ay) * 0.2
        ctrl2_x = bx - (bx - ax) * 0.2
        ctrl2_y = by - (by - ay) * 0.3
        p.C(ctrl1_x, ctrl1_y, ctrl2_x, ctrl2_y, bx, by)
        p.L(cx, cy)
        return p

    @staticmethod
    def _bezier_neckline(
        start_x: float, start_y: float,
        end_x: float, end_y: float,
        depth: float = 0,
    ) -> SVGPath:
        p = SVGPath().M(start_x, start_y)
        ctrl_x = (start_x + end_x) / 2
        ctrl_y = min(start_y, end_y) - depth
        p.Q(ctrl_x, ctrl_y, end_x, end_y)
        return p
