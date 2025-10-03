import { useState } from 'react'
import { Calendar, Clock, MapPin, CreditCard as Edit2, Save, X } from 'lucide-react'

const initialSchedule = [
  { id: 1, asha: 'Meera Gupta', day: 'Monday', time: '9:00 AM - 1:00 PM', location: 'Village Rampur', activity: 'Health Checkup Camp' },
  { id: 2, asha: 'Meera Gupta', day: 'Wednesday', time: '2:00 PM - 5:00 PM', location: 'Village Sikarpur', activity: 'Vaccination Drive' },
  { id: 3, asha: 'Savita Yadav', day: 'Tuesday', time: '10:00 AM - 2:00 PM', location: 'Village Chandanpur', activity: 'Maternal Health Program' },
  { id: 4, asha: 'Savita Yadav', day: 'Friday', time: '9:00 AM - 12:00 PM', location: 'Village Rampur', activity: 'Child Nutrition Program' },
  { id: 5, asha: 'Radha Kumari', day: 'Monday', time: '2:00 PM - 6:00 PM', location: 'Village Devipur', activity: 'Health Awareness Session' },
  { id: 6, asha: 'Radha Kumari', day: 'Thursday', time: '10:00 AM - 1:00 PM', location: 'Village Chandanpur', activity: 'Immunization Camp' },
]

export default function AshaSchedule() {
  const [schedules, setSchedules] = useState(initialSchedule)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (schedule) => {
    setEditingId(schedule.id)
    setEditForm(schedule)
  }

  const handleSave = () => {
    setSchedules(schedules.map(s => s.id === editingId ? editForm : s))
    setEditingId(null)
    setEditForm({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">ASHA Worker Schedule</h2>
        <p className="text-gray-600">Manage and update ASHA worker schedules</p>
      </div>

      <div className="grid gap-4">
        {days.map(day => {
          const daySchedules = schedules.filter(s => s.day === day)

          return (
            <div key={day} className="bg-white rounded-lg shadow">
              <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar size={18} />
                  {day}
                </h3>
              </div>

              {daySchedules.length > 0 ? (
                <div className="p-4 space-y-3">
                  {daySchedules.map(schedule => (
                    <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      {editingId === schedule.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editForm.asha}
                            onChange={(e) => setEditForm({ ...editForm, asha: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="ASHA Name"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              value={editForm.time}
                              onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="Time"
                            />
                            <input
                              type="text"
                              value={editForm.location}
                              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              placeholder="Location"
                            />
                          </div>
                          <input
                            type="text"
                            value={editForm.activity}
                            onChange={(e) => setEditForm({ ...editForm, activity: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Activity"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSave}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              <Save size={16} />
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-2">{schedule.asha}</h4>
                            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <span>{schedule.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{schedule.location}</span>
                              </div>
                              <div>
                                <span className="font-medium">Activity:</span> {schedule.activity}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No schedules for this day
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
