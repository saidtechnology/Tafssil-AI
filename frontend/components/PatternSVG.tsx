import Svg, { Rect, Line, Circle, Text as SvgText, G } from 'react-native-svg';

interface Props {
  width: number;
  height: number;
  measurements: Record<string, number>;
}

export default function PatternSVG({ width: svgW, height: svgH, measurements }: Props) {
  const chest = measurements.chest || 100;
  const length = measurements.height || 120;

  return (
    <Svg width={svgW} height={svgH} viewBox="0 0 500 700">
      <G>
        <Rect x="40" y="40" width={chest} height={length} fill="none" stroke="#e94560" strokeWidth="2" />
        <SvgText x="50" y="35" fill="#e94560" fontSize="12">صدر: {chest} cm</SvgText>
        <SvgText x="50" y={length + 55} fill="#e94560" fontSize="12">طول: {length} cm</SvgText>
        <Line x1="40" y1="40" x2={40 + chest} y2="40" stroke="#e94560" strokeWidth="1" />
        <Circle cx={40 + chest / 2} cy={length / 2} r="5" fill="#e94560" />
      </G>
    </Svg>
  );
}
