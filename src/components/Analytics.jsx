import { Users, Activity, Package, AlertCircle, TrendingUp, TrendingDown, Heart, Stethoscope, Pill, Calendar, Clock, Award, Target, UserCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import PieChart from './PieChart'
import DonutChart from './DonutChart'

export default function Analytics() {
  const [animatedStats, setAnimatedStats] = useState({
    patients: 0,
    asha: 0,
    medicine: 0,
    emergency: 0
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        patients: 1234,
        asha: 24,
        medicine: 156,
        emergency: 18
      })
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { label: 'Total Patients', value: animatedStats.patients, change: '+12%', trend: 'up', icon: Users, color: 'blue', bgGradient: 'from-blue-500 to-blue-600' },
    { label: 'Active ASHA Workers', value: animatedStats.asha, change: '+3', trend: 'up', icon: Activity, color: 'green', bgGradient: 'from-green-500 to-green-600' },
    { label: 'Medicine Stock Items', value: animatedStats.medicine, change: '-8', trend: 'down', icon: Package, color: 'purple', bgGradient: 'from-purple-500 to-purple-600' },
    { label: 'Emergency Cases', value: animatedStats.emergency, change: '+5', trend: 'up', icon: AlertCircle, color: 'red', bgGradient: 'from-red-500 to-red-600' },
  ]

  const monthlyData = [
    { month: 'Apr', patients: 85, emergencies: 12, revenue: 45000, satisfaction: 87 },
    { month: 'May', patients: 92, emergencies: 15, revenue: 52000, satisfaction: 89 },
    { month: 'Jun', patients: 78, emergencies: 10, revenue: 48000, satisfaction: 91 },
    { month: 'Jul', patients: 105, emergencies: 18, revenue: 63000, satisfaction: 85 },
    { month: 'Aug', patients: 98, emergencies: 14, revenue: 58000, satisfaction: 88 },
    { month: 'Sep', patients: 112, emergencies: 16, revenue: 67000, satisfaction: 92 },
  ]

  const maxPatients = Math.max(...monthlyData.map(d => d.patients))
  const maxEmergencies = Math.max(...monthlyData.map(d => d.emergencies))

  const diseasesPieData = [
    { name: 'Hypertension', value: 145, color: '#ef4444' },
    { name: 'Diabetes', value: 120, color: '#f97316' },
    { name: 'Common Cold', value: 98, color: '#3b82f6' },
    { name: 'Anemia', value: 87, color: '#eab308' },
    { name: 'Respiratory', value: 75, color: '#22c55e' },
    { name: 'Others', value: 65, color: '#6b7280' },
  ]

  const ageGroupData = [
    { name: '0-18', value: 234, color: '#8b5cf6' },
    { name: '19-35', value: 412, color: '#ec4899' },
    { name: '36-50', value: 358, color: '#06b6d4' },
    { name: '51-65', value: 182, color: '#f59e0b' },
    { name: '65+', value: 48, color: '#ef4444' },
  ]

  const genderData = [
    { name: 'Male', value: 612, color: '#3b82f6' },
    { name: 'Female', value: 622, color: '#ec4899' },
  ]

  const diseases = [
    { name: 'Hypertension', count: 145, percentage: 35, trend: '+5%', color: 'bg-red-500' },
    { name: 'Diabetes', count: 120, percentage: 29, trend: '+8%', color: 'bg-orange-500' },
    { name: 'Common Cold', count: 98, percentage: 24, trend: '-3%', color: 'bg-blue-500' },
    { name: 'Anemia', count: 87, percentage: 21, trend: '+2%', color: 'bg-yellow-500' },
    { name: 'Respiratory Issues', count: 75, percentage: 18, trend: '+4%', color: 'bg-green-500' },
    { name: 'Others', count: 65, percentage: 16, trend: '-1%', color: 'bg-gray-500' },
  ]

  const ashaPerformance = [
    { name: 'Meera Gupta', visits: 45, rating: 95, patients: 125, area: 'Ward 1' },
    { name: 'Savita Yadav', visits: 38, rating: 88, patients: 98, area: 'Ward 2' },
    { name: 'Radha Kumari', visits: 52, rating: 92, patients: 142, area: 'Ward 3' },
  ]

  const upcomingEvents = [
    { title: 'Vaccination Drive', date: 'Oct 5, 2025', type: 'campaign', icon: Stethoscope },
    { title: 'Health Checkup Camp', date: 'Oct 10, 2025', type: 'camp', icon: Heart },
    { title: 'ASHA Training', date: 'Oct 15, 2025', type: 'training', icon: Award },
  ]

  const quickInsights = [
    { label: 'Avg. Daily Patients', value: '18', icon: Users },
    { label: 'Avg. Treatment Time', value: '25 min', icon: Clock },
    { label: 'Recovery Rate', value: '94%', icon: TrendingUp },
    { label: 'Patient Satisfaction', value: '89%', icon: Heart },
  ]

  const topMedicines = [
    { name: 'Paracetamol', prescribed: 342, stock: 850 },
    { name: 'Amoxicillin', prescribed: 215, stock: 420 },
    { name: 'Metformin', prescribed: 189, stock: 340 },
    { name: 'Amlodipine', prescribed: 167, stock: 280 },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 text-lg">Real-time health center statistics and performance insights</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
          return (
            <div
              key={index}
              className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.bgGradient} shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendIcon size={14} />
                    <span className="text-xs font-bold">{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-black text-gray-800 mb-2 transition-all duration-1000">
                  {stat.value.toLocaleString()}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {quickInsights.map((insight, idx) => {
          const Icon = insight.icon
          return (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <Icon className="text-blue-600" size={24} />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{insight.value}</p>
                  <p className="text-xs text-gray-600">{insight.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Stethoscope className="text-red-600" size={24} />
            Disease Distribution
          </h3>
          <PieChart data={diseasesPieData} size={280} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-purple-600" size={24} />
            Age Group Analysis
          </h3>
          <div className="flex flex-col items-center">
            <DonutChart data={ageGroupData} size={220} />
            <div className="grid grid-cols-2 gap-3 mt-6 w-full">
              {ageGroupData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-gray-700">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <UserCheck className="text-pink-600" size={24} />
            Gender Distribution
          </h3>
          <div className="flex flex-col items-center">
            <DonutChart data={genderData} size={220} innerRadius={0.65} />
            <div className="mt-8 w-full space-y-3">
              {genderData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-gray-800">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-blue-600" size={24} />
            Monthly Trends Overview
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Patient Visits</span>
                <span className="text-sm text-blue-600 font-bold">Avg: {Math.round(monthlyData.reduce((a,b) => a + b.patients, 0) / monthlyData.length)}</span>
              </div>
              <div className="flex gap-2 items-end h-40">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full bg-blue-100 rounded-t-lg overflow-hidden" style={{ height: `${(data.patients / maxPatients) * 100}%` }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000"
                        style={{ height: '100%' }}
                      >
                        <span className="absolute top-2 left-0 right-0 text-center text-white font-bold text-xs">
                          {data.patients}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Emergency Cases</span>
                <span className="text-sm text-red-600 font-bold">Avg: {Math.round(monthlyData.reduce((a,b) => a + b.emergencies, 0) / monthlyData.length)}</span>
              </div>
              <div className="flex gap-2 items-end h-24">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full bg-red-100 rounded-t-lg" style={{ height: `${(data.emergencies / maxEmergencies) * 100}%` }}>
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-red-600 to-red-400 transition-all duration-1000" style={{ height: '100%' }}>
                        <span className="absolute top-1 left-0 right-0 text-center text-white font-bold text-xs">
                          {data.emergencies}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-purple-600" size={24} />
            Upcoming Events
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => {
              const Icon = event.icon
              return (
                <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-yellow-600" size={24} />
            ASHA Worker Performance
          </h3>
          <div className="space-y-4">
            {ashaPerformance.map((asha, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{asha.name}</h4>
                    <p className="text-xs text-gray-600">{asha.area}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">{asha.rating}%</div>
                    <div className="text-xs text-gray-600">{asha.visits} visits</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2.5 rounded-full transition-all duration-1000"
                      style={{ width: `${asha.rating}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{asha.patients} patients served</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Pill className="text-green-600" size={24} />
            Top Prescribed Medicines
          </h3>
          <div className="space-y-4">
            {topMedicines.map((med, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800">{med.name}</h4>
                    <p className="text-xs text-gray-600">Stock: {med.stock} units</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{med.prescribed}</div>
                    <div className="text-xs text-gray-600">prescribed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(med.prescribed / med.stock) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-semibold text-gray-600">
                    {Math.round((med.prescribed / med.stock) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl font-black mb-2">94%</div>
            <div className="text-blue-100 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black mb-2">2.5K</div>
            <div className="text-blue-100 text-sm">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-black mb-2">15+</div>
            <div className="text-blue-100 text-sm">Years of Service</div>
          </div>
        </div>
      </div>
    </div>
  )
}
