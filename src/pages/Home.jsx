import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [activeTab, setActiveTab] = useState('trips')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarItems = [
    { 
      id: 'trips', 
      label: 'My Trips', 
      icon: 'MapPin', 
      active: true,
      description: 'Manage your travel plans'
    },
    { 
      id: 'templates', 
      label: 'Templates', 
      icon: 'Bookmark', 
      active: false,
      placeholder: "Save your first list to create templates!"
    },
    { 
      id: 'weather', 
      label: 'Weather', 
      icon: 'CloudSun', 
      active: false,
      placeholder: "Weather integration coming soon"
    },
    { 
      id: 'tips', 
      label: 'Tips', 
      icon: 'Lightbulb', 
      active: false,
      placeholder: "Packing tips launching next month"
    }
  ]

  const handleSidebarItemClick = (item) => {
    if (item.active) {
      setActiveTab(item.id)
    } else {
      // Show placeholder message for inactive items
      console.log(item.placeholder)
    }
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-surface-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-100 transition-colors"
            >
              <ApperIcon name="Menu" className="h-6 w-6 text-surface-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <ApperIcon name="Luggage" className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient">PackPal</h1>
                <p className="text-xs text-surface-500">Smart Packing Assistant</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button className="hidden md:flex items-center space-x-2 px-3 py-2 bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors">
                <ApperIcon name="Calculator" className="h-4 w-4 text-surface-600" />
                <span className="text-sm text-surface-600">Weight</span>
              </button>
              <button className="hidden md:flex items-center space-x-2 px-3 py-2 bg-surface-100 rounded-lg hover:bg-surface-200 transition-colors">
                <ApperIcon name="Share2" className="h-4 w-4 text-surface-600" />
                <span className="text-sm text-surface-600">Share</span>
              </button>
              <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                <ApperIcon name="Plus" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white/90 backdrop-blur-md border-r border-surface-200 transform transition-transform duration-300 ease-in-out lg:transform-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 lg:p-6 pt-20 lg:pt-6">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleSidebarItemClick(item)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                    ${item.active && activeTab === item.id 
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-l-4 border-primary' 
                      : item.active 
                        ? 'hover:bg-surface-50 text-surface-700' 
                        : 'text-surface-400 cursor-not-allowed'
                    }
                  `}
                  whileHover={item.active ? { scale: 1.02 } : {}}
                  whileTap={item.active ? { scale: 0.98 } : {}}
                >
                  <ApperIcon 
                    name={item.icon} 
                    className={`h-5 w-5 ${
                      item.active && activeTab === item.id ? 'text-primary' : 
                      item.active ? 'text-surface-600' : 'text-surface-300'
                    }`} 
                  />
                  <div className="flex-1">
                    <span className="font-medium">{item.label}</span>
                    {!item.active && (
                      <p className="text-xs text-surface-400 mt-1">{item.placeholder}</p>
                    )}
                  </div>
                </motion.button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] lg:border-l-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'trips' && <MainFeature />}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-surface-200 z-40">
        <div className="flex items-center justify-around py-2">
          {sidebarItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => handleSidebarItemClick(item)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors
                ${item.active && activeTab === item.id 
                  ? 'text-primary' 
                  : item.active 
                    ? 'text-surface-600 hover:text-primary' 
                    : 'text-surface-300'
                }
              `}
              disabled={!item.active}
            >
              <ApperIcon name={item.icon} className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Home