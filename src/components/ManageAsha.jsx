import { useState } from 'react'
import { UserPlus, Trash2, CreditCard as Edit2, Phone, Mail } from 'lucide-react'

const initialAshaWorkers = [
  { id: 1, ashaId: 'ASHA-0A011', name: 'Meera Gupta', phone: '9876543220', email: 'meera@phc.in', area: 'Ward 1', experience: '5 years' },
  { id: 2, ashaId: 'ASHA-0A022', name: 'Savita Yadav', phone: '9876543221', email: 'savita@phc.in', area: 'Ward 2', experience: '3 years' },
  { id: 3, ashaId: 'ASHA-0A033', name: 'Radha Kumari', phone: '9876543222', email: 'radha@phc.in', area: 'Ward 3', experience: '7 years' },
]

export default function ManageAsha() {
  const [ashaWorkers, setAshaWorkers] = useState(initialAshaWorkers)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    ashaId: '',
    name: '',
    phone: '',
    email: '',
    area: '',
    experience: ''
  })

  const handleAdd = () => {
    if (formData.name && formData.phone && formData.area) {
      const generatedAshaId = formData.ashaId && formData.ashaId.trim()
        ? formData.ashaId.trim()
        : `ASHA-${Date.now().toString().slice(-6)}`
      setAshaWorkers([...ashaWorkers, { ...formData, id: Date.now(), ashaId: generatedAshaId }])
      setFormData({ name: '', phone: '', email: '', area: '', experience: '' })
      setShowAddForm(false)
    }
  }

  const handleEdit = (id) => {
    const asha = ashaWorkers.find(a => a.id === id)
    setFormData(asha)
    setEditingId(id)
    setShowAddForm(true)
  }

  const handleUpdate = () => {
    setAshaWorkers(ashaWorkers.map(a => a.id === editingId ? { ...formData, id: editingId } : a))
    setFormData({ ashaId: '', name: '', phone: '', email: '', area: '', experience: '' })
    setEditingId(null)
    setShowAddForm(false)
  }

  const handleRemove = (id) => {
    if (confirm('Are you sure you want to remove this ASHA worker?')) {
      setAshaWorkers(ashaWorkers.filter(a => a.id !== id))
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage ASHA Workers</h2>
          <p className="text-gray-600">Add, edit, or remove ASHA workers</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <UserPlus size={20} />
          Add ASHA Worker
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit ASHA Worker' : 'Add New ASHA Worker'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="ASHA ID"
              value={formData.ashaId}
              onChange={(e) => setFormData({ ...formData, ashaId: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Area/Ward"
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-2"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={editingId ? handleUpdate : handleAdd}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setEditingId(null)
                  setFormData({ ashaId: '', name: '', phone: '', email: '', area: '', experience: '' })
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {ashaWorkers.map((asha) => (
          <div key={asha.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{asha.name}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">{asha.ashaId}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <span>{asha.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span>{asha.email}</span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Area:</span> {asha.area}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Experience:</span> {asha.experience}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(asha.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleRemove(asha.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
