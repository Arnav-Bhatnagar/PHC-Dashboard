import HealthRecords from './HealthRecords'
import ManageAsha from './ManageAsha'
import MedicineStock from './MedicineStock'
import Notifications from './Notifications'
import EmergencyRequests from './EmergencyRequests'
import Analytics from './Analytics'
import AshaSchedule from './AshaSchedule'

export default function Dashboard({ activeTab }) {
  return (
    <div className="flex-1 overflow-auto">
      {activeTab === 'records' && <HealthRecords />}
      {activeTab === 'asha' && <ManageAsha />}
      {activeTab === 'medicine' && <MedicineStock />}
      {activeTab === 'notifications' && <Notifications />}
      {activeTab === 'emergency' && <EmergencyRequests />}
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'schedule' && <AshaSchedule />}
    </div>
  )
}
