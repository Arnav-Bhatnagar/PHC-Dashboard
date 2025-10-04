import React, { useState } from 'react'
import { Search, Download, Eye, TrendingUp, Activity, Calendar, Pill } from 'lucide-react'
import { generatePDF } from '../utils/pdfGenerator'
import { useTranslation } from 'react-i18next'

const mockPatients = [
  {
    id: 'P11125',
    familyId: 'F100',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    contact: '9876543210',
    lastVisit: '2025-09-28',
    diagnosis: 'Hypertension',
    prescription: 'Amlodipine 5mg, Metformin 500mg',
    bloodPressure: '140/90',
    temperature: '98.6°F',
    weight: '75kg',
    visits: [
      { date: '2025-09-28', diagnosis: 'Hypertension Follow-up', bp: '140/90', weight: '75kg', status: 'stable', notes: 'Continue medication, reduce salt intake' },
      { date: '2025-08-15', diagnosis: 'Hypertension', bp: '145/92', weight: '76kg', status: 'improving', notes: 'Adjusted medication dosage' },
      { date: '2025-07-10', diagnosis: 'Hypertension Initial', bp: '150/95', weight: '77kg', status: 'critical', notes: 'Started Amlodipine 5mg' },
      { date: '2025-06-05', diagnosis: 'General Checkup', bp: '155/98', weight: '78kg', status: 'concern', notes: 'High BP detected, lifestyle changes advised' },
    ],
    treatments: [
      { name: 'Amlodipine 5mg', startDate: '2025-07-10', status: 'ongoing', frequency: 'Once daily' },
      { name: 'Metformin 500mg', startDate: '2025-08-15', status: 'ongoing', frequency: 'Twice daily' },
      { name: 'Lifestyle modification', startDate: '2025-06-05', status: 'ongoing', frequency: 'Daily' },
    ],
    recoveryTrend: [
      { metric: 'BP Systolic', values: [155, 150, 145, 140] },
      { metric: 'BP Diastolic', values: [98, 95, 92, 90] },
      { metric: 'Weight (kg)', values: [78, 77, 76, 75] },
    ]
    ,severity: 'urgent'
  },
  {
    id: 'P12126',
    familyId: 'F100',
    name: 'Sunita Devi',
    age: 32,
    gender: 'Female',
    contact: '9876543211',
    lastVisit: '2025-09-29',
    diagnosis: 'Anemia',
    prescription: 'Iron supplements, Folic acid',
    bloodPressure: '120/80',
    temperature: '98.4°F',
    weight: '55kg',
    visits: [
      { date: '2025-09-29', diagnosis: 'Anemia Follow-up', bp: '120/80', weight: '55kg', status: 'improving', notes: 'Hemoglobin improving, continue supplements' },
      { date: '2025-08-20', diagnosis: 'Anemia Treatment', bp: '118/78', weight: '54kg', status: 'stable', notes: 'Started iron and folic acid' },
      { date: '2025-07-25', diagnosis: 'Anemia Diagnosis', bp: '115/75', weight: '53kg', status: 'concern', notes: 'Low hemoglobin detected' },
    ],
    treatments: [
      { name: 'Iron supplements', startDate: '2025-08-20', status: 'ongoing', frequency: 'Twice daily' },
      { name: 'Folic acid', startDate: '2025-08-20', status: 'ongoing', frequency: 'Once daily' },
      { name: 'Dietary changes', startDate: '2025-07-25', status: 'ongoing', frequency: 'Daily' },
    ],
    recoveryTrend: [
      { metric: 'Hemoglobin', values: [8.5, 9.2, 10.1] },
      { metric: 'Weight (kg)', values: [53, 54, 55] },
    ]
    ,severity: 'followup'
  },
  {
    id: 'P13127',
    familyId: 'F101',
    name: 'Amit Singh',
    age: 28,
    gender: 'Male',
    contact: '9876543212',
    lastVisit: '2025-09-30',
    diagnosis: 'Common Cold',
    prescription: 'Paracetamol, Cetirizine',
    bloodPressure: '118/78',
    temperature: '99.2°F',
    weight: '68kg',
    visits: [
      { date: '2025-09-30', diagnosis: 'Common Cold', bp: '118/78', weight: '68kg', status: 'stable', notes: 'Mild fever and congestion' },
      { date: '2025-07-15', diagnosis: 'Viral Fever', bp: '120/80', weight: '69kg', status: 'recovered', notes: 'Full recovery' },
    ],
    treatments: [
      { name: 'Paracetamol', startDate: '2025-09-30', status: 'ongoing', frequency: 'Three times daily' },
      { name: 'Cetirizine', startDate: '2025-09-30', status: 'ongoing', frequency: 'Once daily' },
    ],
    recoveryTrend: [
      { metric: 'Temperature (°F)', values: [100.2, 99.8, 99.2] },
    ]
    ,severity: 'vaccine_pending'
  },
  {
    id: 'P14128',
    familyId: 'F102',
    name: 'Priya Sharma',
    age: 38,
    gender: 'Female',
    contact: '9876543213',
    lastVisit: '2025-09-27',
    diagnosis: 'Diabetes Type 2',
    prescription: 'Metformin 850mg, Glimepiride 2mg',
    bloodPressure: '135/85',
    temperature: '98.5°F',
    weight: '72kg',
    visits: [
      { date: '2025-09-27', diagnosis: 'Diabetes Follow-up', bp: '135/85', weight: '72kg', status: 'stable', notes: 'Blood sugar controlled' },
      { date: '2025-08-10', diagnosis: 'Diabetes Management', bp: '138/87', weight: '73kg', status: 'improving', notes: 'Added Glimepiride' },
      { date: '2025-06-20', diagnosis: 'Diabetes Diagnosis', bp: '140/90', weight: '75kg', status: 'concern', notes: 'Type 2 Diabetes detected' },
    ],
    treatments: [
      { name: 'Metformin 850mg', startDate: '2025-06-20', status: 'ongoing', frequency: 'Twice daily' },
      { name: 'Glimepiride 2mg', startDate: '2025-08-10', status: 'ongoing', frequency: 'Once daily' },
      { name: 'Diet control', startDate: '2025-06-20', status: 'ongoing', frequency: 'Daily' },
    ],
    recoveryTrend: [
      { metric: 'Blood Sugar (mg/dL)', values: [185, 160, 145, 130] },
      { metric: 'Weight (kg)', values: [75, 74, 73, 72] },
    ]
    ,severity: 'followup'
  },
]

export default function HealthRecords() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [pdfLang, setPdfLang] = useState('en')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [sortBySeverity, setSortBySeverity] = useState(false)
  
  const [viewMode, setViewMode] = useState('individual') // 'individual' or 'family'
  const [expandedFamilies, setExpandedFamilies] = useState({})

  const toggleFamily = (fid) => {
    setExpandedFamilies(prev => ({ ...prev, [fid]: !prev[fid] }))
  }

  const severityOrder = { urgent: 0, followup: 1, vaccine_pending: 2, routine: 3 }

  const severityLabel = (key) => {
    switch(key) {
      case 'urgent': return t('Urgent Care')
      case 'followup': return t('Follow Up')
      case 'vaccine_pending': return t('Vaccine Pending')
      default: return t('Routine')
    }
  }

  const severityBadgeClass = (key) => {
    switch(key) {
      case 'urgent': return 'bg-red-100 text-red-700'
      case 'followup': return 'bg-yellow-100 text-yellow-700'
      case 'vaccine_pending': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  let displayedPatients = mockPatients.filter(patient =>
    (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.contact.includes(searchTerm)) &&
    (severityFilter === 'all' || patient.severity === severityFilter)
  )

  if (sortBySeverity) {
    displayedPatients = [...displayedPatients].sort((a,b) => {
      const oa = severityOrder[a.severity] ?? 99
      const ob = severityOrder[b.severity] ?? 99
      return oa - ob
    })
  }

  // group by family if requested
  const families = displayedPatients.reduce((acc, p) => {
    const fid = p.familyId || 'unknown'
    if (!acc[fid]) acc[fid] = []
    acc[fid].push(p)
    return acc
  }, {})

  const { i18n } = useTranslation()

  const handleDownloadPDF = (patient) => {
    // pass selected pdf language to generator
    generatePDF(patient, pdfLang || i18n.language)
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'recovered': return 'bg-green-100 text-green-700'
      case 'improving': return 'bg-blue-100 text-blue-700'
      case 'stable': return 'bg-yellow-100 text-yellow-700'
      case 'concern': return 'bg-orange-100 text-orange-700'
      case 'critical': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('Patient Health Records')}</h2>
        <p className="text-gray-600">{t('View and download patient medical records')}</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('Search placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">{t('View Mode')}:</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setViewMode('individual')} className={`px-3 py-1 rounded ${viewMode === 'individual' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t('Individual')}</button>
            <button onClick={() => setViewMode('family')} className={`px-3 py-1 rounded ${viewMode === 'family' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t('By Family')}</button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">{t('Filter by Severity')}:</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="all">{t('All')}</option>
            <option value="urgent">{t('Urgent Care')}</option>
            <option value="followup">{t('Follow Up')}</option>
            <option value="vaccine_pending">{t('Vaccine Pending')}</option>
            <option value="routine">{t('Routine')}</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">{t('Sort by Severity')}:</label>
          <button
            onClick={() => setSortBySeverity(s => !s)}
            className={`px-3 py-2 rounded-lg ${sortBySeverity ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            {sortBySeverity ? t('On') : t('Off')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{viewMode === 'individual' ? t('Patient ID') : t('Family ID')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Patient Name')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Age')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Gender')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Contact')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Last Visit')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Actions')}</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('Severity')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {viewMode === 'individual' && displayedPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{patient.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{patient.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{patient.age}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{patient.gender}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{patient.contact}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{patient.lastVisit}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title={t('View Details')}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(patient)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title={t('Download PDF')}
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadgeClass(patient.severity)}`}>
                    {severityLabel(patient.severity)}
                  </span>
                </td>
              </tr>
            ))}

            {viewMode === 'family' && Object.keys(families).map(fid => {
              const members = families[fid]
              const primary = members[0]
              return (
                <React.Fragment key={fid}>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{fid}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{members.length} members</td>
                    <td className="px-6 py-4 text-sm">-</td>
                    <td className="px-6 py-4 text-sm">-</td>
                    <td className="px-6 py-4 text-sm">-</td>
                    <td className="px-6 py-4 text-sm">{primary.lastVisit}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => toggleFamily(fid)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          {expandedFamilies[fid] ? t('Hide Members') : t('View Family')}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadgeClass(primary.severity)}`}>
                        {severityLabel(primary.severity)}
                      </span>
                    </td>
                  </tr>

                  {expandedFamilies[fid] && members.map(m => (
                    <tr key={m.id} className="border-l-4 border-dashed border-gray-200">
                      <td className="px-6 py-2 text-sm text-gray-700">{/* empty in family view per request */}</td>
                      <td className="px-6 py-2 text-sm text-gray-700">{m.name}</td>
                      <td className="px-6 py-2 text-sm text-gray-700">{m.age}</td>
                      <td className="px-6 py-2 text-sm text-gray-700">{m.gender}</td>
                      <td className="px-6 py-2 text-sm text-gray-700">{m.contact}</td>
                      <td className="px-6 py-2 text-sm text-gray-700">{m.lastVisit}</td>
                      <td className="px-6 py-2 text-sm">
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedPatient(m)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{t('View')}</button>
                          <button onClick={() => handleDownloadPDF(m)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">{t('Download')}</button>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-sm">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadgeClass(m.severity)}`}>
                          {severityLabel(m.severity)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h3>
                <p className="text-gray-600 mt-1">{t('Complete Patient Journey & Health Record')}</p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Activity size={20} />
                  <span className="text-sm font-semibold">{t('Total Visits')}</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{selectedPatient.visits.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                  <Pill size={20} />
                  <span className="text-sm font-semibold">{t('Active Treatments')}</span>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {selectedPatient.treatments.filter(t => t.status === 'ongoing').length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-purple-600 mb-1">
                  <Calendar size={20} />
                  <span className="text-sm font-semibold">{t('Last Visit Label')}</span>
                </div>
                <p className="text-lg font-bold text-purple-900">{selectedPatient.lastVisit}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">{t('Patient Information')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Patient ID')}:</span>
                    <span className="font-medium">{selectedPatient.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Severity')}:</span>
                    <span className="font-medium">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${severityBadgeClass(selectedPatient.severity)}`}>
                        {severityLabel(selectedPatient.severity)}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Age')}:</span>
                    <span className="font-medium">{selectedPatient.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Gender')}:</span>
                    <span className="font-medium">{selectedPatient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Contact')}:</span>
                    <span className="font-medium">{selectedPatient.contact}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Current Diagnosis')}:</span>
                    <span className="font-medium">{selectedPatient.diagnosis}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">{t('Current Vitals')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Blood Pressure')}:</span>
                    <span className="font-medium">{selectedPatient.bloodPressure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Temperature')}:</span>
                    <span className="font-medium">{selectedPatient.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Weight')}:</span>
                    <span className="font-medium">{selectedPatient.weight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('Prescription')}:</span>
                    <span className="font-medium text-right">{selectedPatient.prescription}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                {t('Recovery Trend Analysis')}
              </h4>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
                {selectedPatient.recoveryTrend.map((trend, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">{trend.metric}</span>
                      <div className="flex items-center gap-2">
                        {trend.values.map((val, i) => (
                          <span key={i} className="text-xs font-medium text-gray-600">
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {trend.values.map((val, i) => {
                        const maxVal = Math.max(...trend.values)
                        const minVal = Math.min(...trend.values)
                        const range = maxVal - minVal || 1
                        const height = ((val - minVal) / range) * 60 + 20
                        const isImproving = i > 0 && val < trend.values[i-1] && trend.metric.includes('BP')
                        const isImprovingWeight = i > 0 && val < trend.values[i-1] && trend.metric.includes('Weight')
                        const color = isImproving || isImprovingWeight ? 'bg-green-500' : 'bg-blue-500'

                        return (
                          <div key={i} className="flex-1 flex items-end">
                            <div
                              className={`w-full ${color} rounded-t transition-all`}
                              style={{ height: `${height}px` }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-green-600" />
                {t('Patient Journey Timeline')}
              </h4>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-4">
                  {selectedPatient.visits.map((visit, idx) => (
                    <div key={idx} className="relative pl-12">
                      <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        idx === 0 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        <span className="text-white text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div className={`bg-white border-2 rounded-lg p-4 ${
                        idx === 0 ? 'border-blue-500 shadow-md' : 'border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-semibold text-gray-800">{visit.diagnosis}</h5>
                            <p className="text-xs text-gray-500">{visit.date}</p>
                          </div>
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(visit.status)}`}>
                            {visit.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">BP:</span> {visit.bp}
                          </div>
                          <div>
                            <span className="font-medium">Weight:</span> {visit.weight}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic">{visit.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Pill size={20} className="text-orange-600" />
                {t('Treatment History')}
              </h4>
              <div className="grid gap-3">
                {selectedPatient.treatments.map((treatment, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-semibold text-gray-800">{treatment.name}</h5>
                        <p className="text-sm text-gray-600">Started: {treatment.startDate}</p>
                        <p className="text-sm text-gray-600">Frequency: {treatment.frequency}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        treatment.status === 'ongoing'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {treatment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">{t('Select Language')}:</label>
                <div className="flex gap-2">
                  <button onClick={() => setPdfLang('en')} className={`px-3 py-1 rounded ${pdfLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t('language.english')}</button>
                  <button onClick={() => setPdfLang('hi')} className={`px-3 py-1 rounded ${pdfLang === 'hi' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t('language.hindi')}</button>
                  <button onClick={() => setPdfLang('pa')} className={`px-3 py-1 rounded ${pdfLang === 'pa' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{t('language.punjabi')}</button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownloadPDF(selectedPatient)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {t('Download Complete Record PDF')}
                </button>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
