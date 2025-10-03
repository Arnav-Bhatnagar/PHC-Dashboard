import { useState } from 'react'
import { Send, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Notifications() {
  const { t } = useTranslation()
  const [notification, setNotification] = useState({
    recipient: 'all',
    title: '',
    message: ''
  })
  const [sentNotifications, setSentNotifications] = useState([
    { id: 1, recipient: 'All ASHA Workers', title: 'Monthly Meeting', message: 'Monthly review meeting scheduled for October 5th', time: '2025-09-28 10:30 AM' },
    { id: 2, recipient: 'Ward 1', title: 'Vaccination Drive', message: 'Polio vaccination drive starting tomorrow', time: '2025-09-27 02:15 PM' },
    { id: 3, recipient: 'Ward 3', title: 'Health Camp', message: 'Free health checkup camp on October 10th', time: '2025-09-26 11:00 AM' },
  ])

  const handleSend = () => {
    if (notification.title && notification.message) {
      const newNotification = {
        id: Date.now(),
        recipient: notification.recipient === 'all' ? 'All ASHA Workers' : notification.recipient,
        title: notification.title,
        message: notification.message,
        time: new Date().toLocaleString()
      }
      setSentNotifications([newNotification, ...sentNotifications])
      setNotification({ recipient: 'all', title: '', message: '' })
      alert(t('Notification sent successfully!'))
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('Send Notifications')}</h2>
        <p className="text-gray-600">{t('Send alerts and updates to ASHA workers')}</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{t('Compose Notification')}</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('Recipient')}</label>
              <select
                value={notification.recipient}
                onChange={(e) => setNotification({ ...notification, recipient: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All ASHA Workers</option>
                <option value="Ward 1">Ward 1</option>
                <option value="Ward 2">Ward 2</option>
                <option value="Ward 3">Ward 3</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('Title')}</label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                placeholder={t('Enter notification title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('Message')}</label>
              <textarea
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                placeholder={t('Enter notification message')}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {t('Send Notification')}
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users size={20} />
              {t('Quick Actions')}
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setNotification({ ...notification, title: 'Emergency Alert', message: '' })}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-left"
              >
                {t('Emergency Alert')}
              </button>
              <button
                onClick={() => setNotification({ ...notification, title: 'Meeting Reminder', message: '' })}
                className="w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-left"
              >
                {t('Meeting Reminder')}
              </button>
              <button
                onClick={() => setNotification({ ...notification, title: 'Health Camp Notice', message: '' })}
                className="w-full px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-left"
              >
                {t('Health Camp Notice')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
  <h3 className="text-xl font-semibold mb-4">{t('Sent Notifications')}</h3>
        <div className="space-y-3">
          {sentNotifications.map((notif) => (
            <div key={notif.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-800">{notif.title}</h4>
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{notif.message}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">To: {notif.recipient}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
