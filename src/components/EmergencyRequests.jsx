import { useState } from 'react'
import { AlertCircle, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

const initialRequests = [
  { id: 1, patient: 'Ramesh Yadav', location: 'Village Rampur, Ward 2', phone: '9876543230', type: 'Chest Pain', time: '10 mins ago', status: 'pending', priority: 'high', asha:'ASHA-A0112' },
  { id: 2, patient: 'Kavita Sharma', location: 'Village Sikarpur, Ward 1', phone: '9876543231', type: 'High Fever', time: '25 mins ago', status: 'pending', priority: 'medium', asha:'ASHA-A0122' },
  { id: 3, patient: 'Sunil Kumar', location: 'Village Chandanpur, Ward 3', phone: '9876543232', type: 'Accident', time: '1 hour ago', status: 'resolved', priority: 'high', asha:'ASHA-A0332' },
  { id: 4, patient: 'Anita Devi', location: 'Village Rampur, Ward 2', phone: '9876543233', type: 'Pregnancy Complications', time: '2 hours ago', status: 'resolved', priority: 'high', asha:'ASHA-A0032' },
]

export default function EmergencyRequests() {
  const [requests, setRequests] = useState(initialRequests)
  const [filter, setFilter] = useState('all')

  const handleResolve = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: 'resolved' } : req
    ))
  }

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(req => req.status === filter)

  const pendingCount = requests.filter(req => req.status === 'pending').length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Emergency Requests</h2>
        <p className="text-gray-600">Monitor and respond to emergency health requests</p>
      </div>

      {pendingCount > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-800 font-medium">
              {pendingCount} pending emergency request{pendingCount !== 1 ? 's' : ''} requiring attention
            </p>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          All Requests
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg transition-colors ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded-lg transition-colors ${filter === 'resolved' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
        >
          Resolved
        </button>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow border-l-4 ${
              request.priority === 'high' ? 'border-red-500' : 'border-yellow-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{request.patient}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {request.status === 'pending' ? 'Pending' : 'Resolved'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.priority === 'high'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {request.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <AlertCircle size={16} />
                    <span><strong>Emergency Type:</strong> {request.type}</span>
                    
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <span><strong>Contact:</strong> {request.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span><strong>Location:</strong> {request.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span><strong>Reported:</strong> {request.time}</span>
                  </div>
                  <span><strong>Sent By:</strong> {request.asha}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`tel:${request.phone}`}
                  className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  title="Call Patient"
                >
                  <Phone size={18} />
                </a>
                {request.status === 'pending' && (
                  <button
                    onClick={() => handleResolve(request.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Mark Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
