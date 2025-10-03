export default function PieChart({ data, size = 200 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90

  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = size / 2 + (size / 2) * Math.cos(startRad)
    const y1 = size / 2 + (size / 2) * Math.sin(startRad)
    const x2 = size / 2 + (size / 2) * Math.cos(endRad)
    const y2 = size / 2 + (size / 2) * Math.sin(endRad)

    const largeArc = angle > 180 ? 1 : 0

    const path = `M ${size / 2} ${size / 2} L ${x1} ${y1} A ${size / 2} ${size / 2} 0 ${largeArc} 1 ${x2} ${y2} Z`

    const labelAngle = (startAngle + endAngle) / 2
    const labelRad = (labelAngle * Math.PI) / 180
    const labelX = size / 2 + (size / 3) * Math.cos(labelRad)
    const labelY = size / 2 + (size / 3) * Math.sin(labelRad)

    return {
      path,
      color: item.color,
      percentage: percentage.toFixed(1),
      labelX,
      labelY,
      name: item.name
    }
  })

  return (
    <div className="flex items-center justify-center gap-8">
      <svg width={size} height={size} className="transform transition-all duration-300 hover:scale-105">
        {slices.map((slice, index) => (
          <g key={index}>
            <path
              d={slice.path}
              fill={slice.color}
              className="transition-all duration-300 hover:opacity-80"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            {parseFloat(slice.percentage) > 5 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none"
              >
                {slice.percentage}%
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-sm">
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="text-gray-600">{item.value} cases</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
