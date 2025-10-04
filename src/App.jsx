import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'

function App() {
  const [activeTab, setActiveTab] = useState('analytics')

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Dashboard activeTab={activeTab} />
    </div>
  )
}

export default App
