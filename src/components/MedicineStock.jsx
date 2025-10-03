import { useState } from 'react'
import { Plus, Minus, AlertTriangle } from 'lucide-react'

const initialMedicines = [
  { id: 1, name: 'Paracetamol 500mg', stock: 500, minStock: 100, category: 'Pain Relief', expiry: '2026-03-15' },
  { id: 2, name: 'Amoxicillin 250mg', stock: 30, minStock: 50, category: 'Antibiotic', expiry: '2025-12-20' },
  { id: 3, name: 'Cetirizine 10mg', stock: 200, minStock: 80, category: 'Antihistamine', expiry: '2026-01-10' },
  { id: 4, name: 'Metformin 500mg', stock: 150, minStock: 100, category: 'Diabetes', expiry: '2026-06-25' },
  { id: 5, name: 'Amlodipine 5mg', stock: 20, minStock: 60, category: 'Hypertension', expiry: '2025-11-30' },
]

export default function MedicineStock() {
  const [medicines, setMedicines] = useState(initialMedicines)
  const [updateQuantity, setUpdateQuantity] = useState({})

  const handleUpdateStock = (id, change) => {
    setMedicines(medicines.map(med =>
      med.id === id ? { ...med, stock: Math.max(0, med.stock + change) } : med
    ))
  }

  const handleQuickUpdate = (id) => {
    const quantity = parseInt(updateQuantity[id] || 0)
    if (quantity) {
      setMedicines(medicines.map(med =>
        med.id === id ? { ...med, stock: Math.max(0, med.stock + quantity) } : med
      ))
      setUpdateQuantity({ ...updateQuantity, [id]: '' })
    }
  }

  const getLowStockCount = () => medicines.filter(med => med.stock < med.minStock).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Medicine Stock Management</h2>
        <p className="text-gray-600">Monitor and update medicine inventory</p>
      </div>

      {getLowStockCount() > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" size={20} />
            <p className="text-yellow-800 font-medium">
              {getLowStockCount()} medicine(s) are running low on stock
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Medicine Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Min. Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.map((medicine) => (
              <tr key={medicine.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{medicine.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{medicine.category}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`font-semibold ${medicine.stock < medicine.minStock ? 'text-red-600' : 'text-green-600'}`}>
                    {medicine.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{medicine.minStock}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{medicine.expiry}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStock(medicine.id, -10)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={updateQuantity[medicine.id] || ''}
                      onChange={(e) => setUpdateQuantity({ ...updateQuantity, [medicine.id]: e.target.value })}
                      placeholder="0"
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleQuickUpdate(medicine.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleUpdateStock(medicine.id, 10)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
