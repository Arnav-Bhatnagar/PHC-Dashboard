import { FileText, Users, Package, Bell, AlertCircle, BarChart3, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Sidebar({ activeTab, setActiveTab }) {
  const { t, i18n } = useTranslation()

  const menuItems = [
    { id: 'analytics', label: t('Analytics'), icon: BarChart3 },
    { id: 'records', label: t('Health Records'), icon: FileText },
    { id: 'asha', label: t('Manage ASHA'), icon: Users },
    { id: 'medicine', label: t('Medicine Stock'), icon: Package },
    { id: 'notifications', label: t('Notifications'), icon: Bell },
    { id: 'emergency', label: t('Emergency Requests'), icon: AlertCircle },
    
    { id: 'schedule', label: t('ASHA Schedule'), icon: Calendar },
  ]

  const changeLang = (lng) => i18n.changeLanguage(lng)

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">{t('PHC Dashboard')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('Health Management System')}</p>

        <div className="mt-4">
          <label className="text-xs text-gray-500">{t('Select Language')}</label>
          <div className="mt-2 flex gap-2">
            <button onClick={() => changeLang('en')} className="px-2 py-1 rounded bg-gray-100 text-xs">{t('language.english')}</button>
            <button onClick={() => changeLang('hi')} className="px-2 py-1 rounded bg-gray-100 text-xs">{t('language.hindi')}</button>
            <button onClick={() => changeLang('pa')} className="px-2 py-1 rounded bg-gray-100 text-xs">{t('language.punjabi')}</button>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
