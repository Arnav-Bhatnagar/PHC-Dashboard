export default function DonutChart({ data, size = 180, innerRadius = 0.6 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const radius = size / 2
  const innerR = radius * innerRadius
  let currentAngle = -90

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = radius + radius * Math.cos(startRad)
    const y1 = radius + radius * Math.sin(startRad)
    const x2 = radius + radius * Math.cos(endRad)
    const y2 = radius + radius * Math.sin(endRad)

    const x3 = radius + innerR * Math.cos(endRad)
    const y3 = radius + innerR * Math.sin(endRad)
    const x4 = radius + innerR * Math.cos(startRad)
    const y4 = radius + innerR * Math.sin(startRad)

    const largeArc = angle > 180 ? 1 : 0

    const path = `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `

    return {
      path,
      color: item.color,
      percentage: percentage.toFixed(1),
      name: item.name,
      value: item.value
    }
  })

  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="transform transition-all duration-300">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.path}
            fill={slice.color}
            className="transition-all duration-300 hover:opacity-80"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-black text-gray-800">{total}</div>
          <div className="text-xs text-gray-600 font-semibold">Total</div>
        </div>
      </div>
    </div>
  )
}
