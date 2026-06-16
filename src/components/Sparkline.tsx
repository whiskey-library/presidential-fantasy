export default function Sparkline({
  data,
  width = 240,
  height = 56,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (data.length < 2) {
    return <div className="sparkline sparkline--empty">Not enough data yet</div>;
  }
  const max = 100;
  const min = 0;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / (max - min)) * height;
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;
  const last = points[points.length - 1];

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Approval over time">
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} className="sparkline__mid" />
      <path d={area} className="sparkline__area" />
      <path d={path} className="sparkline__line" />
      <circle cx={last[0]} cy={last[1]} r="3.5" className="sparkline__dot" />
    </svg>
  );
}
