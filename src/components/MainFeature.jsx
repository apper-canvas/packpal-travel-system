import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { tripService } from '../services'
import { packingListService } from '../services'
import { reminderService } from '../services'

const MainFeature = () => {
  // Core states
  const [trips, setTrips] = useState([])
  const [packingLists, setPackingLists] = useState([])
  const [reminders, setReminders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // UI states
  const [currentTrip, setCurrentTrip] = useState(null)
  const [currentList, setCurrentList] = useState(null)
  const [showTripSetup, setShowTripSetup] = useState(false)
  const [showLastMinute, setShowLastMinute] = useState(false)
  const [newItemText, setNewItemText] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [setupStep, setSetupStep] = useState(1)

  // Trip setup form
  const [tripForm, setTripForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    tripType: 'leisure'
  })

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [tripsData, listsData, remindersData] = await Promise.all([
          tripService.getAll(),
          packingListService.getAll(),
          reminderService.getAll()
        ])
        setTrips(tripsData || [])
        setPackingLists(listsData || [])
        setReminders(remindersData || [])
        
        // Set current trip if exists
        if (tripsData?.length > 0) {
          setCurrentTrip(tripsData[0])
          const tripList = listsData?.find(list => list.tripId === tripsData[0].id)
          if (tripList) setCurrentList(tripList)
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Create new trip and generate packing list
  const handleCreateTrip = async () => {
    if (!tripForm.destination || !tripForm.startDate || !tripForm.endDate) {
      toast.error("Please fill in all trip details")
      return
    }

    setLoading(true)
    try {
      // Create trip
      const newTrip = await tripService.create({
        ...tripForm,
        weather: {
          temperature: Math.floor(Math.random() * 30) + 10,
          conditions: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)]
        }
      })

      // Generate packing list based on trip details
      const generatedItems = generatePackingItems(tripForm)
      const newList = await packingListService.create({
        tripId: newTrip.id,
        items: generatedItems,
        isTemplate: false
      })

      setTrips(prev => [newTrip, ...prev])
      setPackingLists(prev => [newList, ...prev])
      setCurrentTrip(newTrip)
      setCurrentList(newList)
      setShowTripSetup(false)
      setSetupStep(1)
      setTripForm({ destination: '', startDate: '', endDate: '', tripType: 'leisure' })
      
      toast.success("Trip created and packing list generated!")
    } catch (err) {
      setError(err.message)
      toast.error("Failed to create trip")
    } finally {
      setLoading(false)
    }
  }

  // Generate packing items based on trip details
  const generatePackingItems = (trip) => {
    const baseItems = [
      { name: 'Passport/ID', category: 'documents', quantity: 1, isEssential: true },
      { name: 'Phone Charger', category: 'electronics', quantity: 1, isEssential: true },
      { name: 'Underwear', category: 'clothing', quantity: 3, isEssential: true },
      { name: 'Toothbrush', category: 'toiletries', quantity: 1, isEssential: true },
      { name: 'Toothpaste', category: 'toiletries', quantity: 1, isEssential: true }
    ]

    const tripTypeItems = {
      business: [
        { name: 'Business Cards', category: 'documents', quantity: 1 },
        { name: 'Laptop', category: 'electronics', quantity: 1 },
        { name: 'Dress Shirts', category: 'clothing', quantity: 3 },
        { name: 'Dress Shoes', category: 'clothing', quantity: 1 }
      ],
      leisure: [
        { name: 'Sunglasses', category: 'other', quantity: 1 },
        { name: 'Casual Shirts', category: 'clothing', quantity: 4 },
        { name: 'Shorts', category: 'clothing', quantity: 2 },
        { name: 'Flip Flops', category: 'clothing', quantity: 1 }
      ],
      adventure: [
        { name: 'Hiking Boots', category: 'clothing', quantity: 1 },
        { name: 'Rain Jacket', category: 'clothing', quantity: 1 },
        { name: 'First Aid Kit', category: 'other', quantity: 1 },
        { name: 'Water Bottle', category: 'other', quantity: 1 }
      ]
    }

    const allItems = [...baseItems, ...(tripTypeItems[trip.tripType] || [])]
    return allItems.map(item => ({
      ...item,
      id: Date.now() + Math.random(),
      isPacked: false,
      isEssential: item.isEssential || false,
      notes: ''
    }))
  }

  // Toggle item packed status
  const toggleItemPacked = async (itemId) => {
    if (!currentList) return

    const updatedItems = currentList.items.map(item =>
      item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
    )

    try {
      const updatedList = await packingListService.update(currentList.id, {
        ...currentList,
        items: updatedItems
      })
      setCurrentList(updatedList)
      setPackingLists(prev => prev.map(list => 
        list.id === currentList.id ? updatedList : list
      ))
    } catch (err) {
      toast.error("Failed to update item")
    }
  }

  // Add new item
  const addNewItem = async () => {
    if (!newItemText.trim() || !currentList) return

    const newItem = {
      id: Date.now(),
      name: newItemText.trim(),
      category: 'other',
      quantity: 1,
      isPacked: false,
      isEssential: false,
      notes: ''
    }

    try {
      const updatedList = await packingListService.update(currentList.id, {
        ...currentList,
        items: [...currentList.items, newItem]
      })
      setCurrentList(updatedList)
      setPackingLists(prev => prev.map(list => 
        list.id === currentList.id ? updatedList : list
      ))
      setNewItemText('')
      toast.success("Item added to list")
    } catch (err) {
      toast.error("Failed to add item")
    }
  }

  // Delete item
  const deleteItem = async (itemId) => {
    if (!currentList) return

    try {
      const updatedItems = currentList.items.filter(item => item.id !== itemId)
      const updatedList = await packingListService.update(currentList.id, {
        ...currentList,
        items: updatedItems
      })
      setCurrentList(updatedList)
      setPackingLists(prev => prev.map(list => 
        list.id === currentList.id ? updatedList : list
      ))
      toast.success("Item removed from list")
    } catch (err) {
      toast.error("Failed to remove item")
    }
  }

  // Calculate progress
  const getProgress = () => {
    if (!currentList?.items?.length) return 0
    const packedCount = currentList.items.filter(item => item.isPacked).length
    return Math.round((packedCount / currentList.items.length) * 100)
  }

  // Group items by category
  const getItemsByCategory = () => {
    if (!currentList?.items) return {}
    return currentList.items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    }, {})
  }

  const progress = getProgress()
  const itemsByCategory = getItemsByCategory()
  const categories = {
    documents: { label: 'Documents', icon: 'FileText', color: 'category-documents' },
    electronics: { label: 'Electronics', icon: 'Smartphone', color: 'category-electronics' },
    clothing: { label: 'Clothing', icon: 'Shirt', color: 'category-clothing' },
    toiletries: { label: 'Toiletries', icon: 'Droplets', color: 'category-toiletries' },
    other: { label: 'Other', icon: 'Package', color: 'category-other' }
  }

  if (loading && !currentTrip) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Current Trip Header */}
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            {currentTrip ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="MapPin" className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-surface-800">{currentTrip.destination}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-surface-600">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Calendar" className="h-4 w-4" />
                    <span>{new Date(currentTrip.startDate).toLocaleDateString()} - {new Date(currentTrip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="Briefcase" className="h-4 w-4" />
                    <span className="capitalize">{currentTrip.tripType}</span>
                  </div>
                  {currentTrip.weather && (
                    <div className="flex items-center space-x-1">
                      <ApperIcon name="Thermometer" className="h-4 w-4" />
                      <span>{currentTrip.weather.temperature}°C, {currentTrip.weather.conditions}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ApperIcon name="PlusCircle" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-surface-600 mb-2">No trips planned yet</h2>
                <p className="text-surface-500">Create your first trip to start packing!</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowTripSetup(true)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>{currentTrip ? 'New Trip' : 'Plan Trip'}</span>
            </button>
            
            {currentTrip && (
              <button
                onClick={() => setShowLastMinute(true)}
                className="flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-yellow-500 transition-colors"
              >
                <ApperIcon name="Clock" className="h-5 w-5" />
                <span>Last Minute</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {currentList && (
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-surface-800 mb-1">Packing Progress</h3>
              <p className="text-surface-600">
                {currentList.items.filter(item => item.isPacked).length} of {currentList.items.length} items packed
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray={`${progress}, 100`}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-surface-800">{progress}%</span>
                </div>
              </div>
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-2xl"
                >
                  🎉
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Progress Messages */}
          <div className="bg-surface-50 rounded-xl p-4">
            {progress === 0 && (
              <p className="text-surface-600">Ready to start packing? Check off items as you go!</p>
            )}
            {progress > 0 && progress < 50 && (
              <p className="text-surface-600">Great start! Keep going to reach the halfway point.</p>
            )}
            {progress >= 50 && progress < 100 && (
              <p className="text-surface-600">You're more than halfway there! Almost ready to go.</p>
            )}
            {progress === 100 && (
              <p className="text-secondary font-medium">Perfect! You're all packed and ready for your trip! ✈️</p>
            )}
          </div>
        </div>
      )}

      {/* Add Item Section */}
      {currentList && (
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-surface-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Add packing item..."
              className="flex-1 px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              onKeyPress={(e) => e.key === 'Enter' && addNewItem()}
            />
            <button
              onClick={addNewItem}
              disabled={!newItemText.trim()}
              className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      )}

      {/* Packing List */}
      {currentList && (
        <div className="space-y-4">
          {Object.entries(itemsByCategory).map(([categoryKey, items]) => {
            const category = categories[categoryKey] || categories.other
            return (
              <div key={categoryKey} className="bg-white rounded-2xl shadow-soft border border-surface-200 overflow-hidden">
                <div className={`bg-${category.color} p-4`}>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name={category.icon} className="h-5 w-5 text-surface-700" />
                    <h4 className="font-semibold text-surface-800">{category.label}</h4>
                    <span className="bg-white/80 text-surface-600 text-sm px-2 py-1 rounded-full">
                      {items.filter(item => item.isPacked).length}/{items.length}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`
                          flex items-center space-x-3 p-3 rounded-xl border transition-all duration-200
                          ${item.isPacked 
                            ? 'bg-secondary/10 border-secondary/20' 
                            : 'bg-surface-50 border-surface-200 hover:border-surface-300'
                          }
                        `}
                      >
                        <motion.button
                          onClick={() => toggleItemPacked(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`
                            w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200
                            ${item.isPacked 
                              ? 'bg-secondary border-secondary text-white' 
                              : 'border-surface-300 hover:border-secondary'
                            }
                          `}
                        >
                          {item.isPacked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <ApperIcon name="Check" className="h-4 w-4" />
                            </motion.div>
                          )}
                        </motion.button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`
                              font-medium transition-all duration-200
                              ${item.isPacked ? 'line-through text-surface-500' : 'text-surface-800'}
                            `}>
                              {item.name}
                            </span>
                            {item.isEssential && (
                              <span className="bg-accent/20 text-amber-700 text-xs px-2 py-1 rounded-full">
                                Essential
                              </span>
                            )}
                          </div>
                          {item.quantity > 1 && (
                            <span className="text-sm text-surface-500">Qty: {item.quantity}</span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 text-surface-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Trip Setup Modal */}
      <AnimatePresence>
        {showTripSetup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-800">Plan New Trip</h3>
                  <button
                    onClick={() => {
                      setShowTripSetup(false)
                      setSetupStep(1)
                    }}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Step 1: Destination */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={tripForm.destination}
                      onChange={(e) => setTripForm(prev => ({ ...prev, destination: e.target.value }))}
                      placeholder="Where are you going?"
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Step 2: Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={tripForm.startDate}
                        onChange={(e) => setTripForm(prev => ({ ...prev, startDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={tripForm.endDate}
                        onChange={(e) => setTripForm(prev => ({ ...prev, endDate: e.target.value }))}
                        className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Step 3: Trip Type */}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Trip Type
                    </label>
                    <select
                      value={tripForm.tripType}
                      onChange={(e) => setTripForm(prev => ({ ...prev, tripType: e.target.value }))}
                      className="w-full px-4 py-3 border border-surface-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="leisure">Leisure</option>
                      <option value="business">Business</option>
                      <option value="adventure">Adventure</option>
                      <option value="family">Family</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCreateTrip}
                    disabled={loading || !tripForm.destination || !tripForm.startDate || !tripForm.endDate}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {loading ? 'Creating Trip...' : 'Create Trip & Generate List'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Last Minute Modal */}
      <AnimatePresence>
        {showLastMinute && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-surface-800">Last-Minute Checklist</h3>
                  <button
                    onClick={() => setShowLastMinute(false)}
                    className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {reminders?.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`
                        p-4 rounded-xl border-l-4 
                        ${reminder.priority === 'critical' ? 'border-red-500 bg-red-50' : 
                          reminder.priority === 'important' ? 'border-accent bg-yellow-50' : 
                          'border-blue-500 bg-blue-50'
                        }
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          className="mt-1 w-5 h-5 text-primary border-surface-300 rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-surface-800">{reminder.text}</p>
                          <span className={`
                            text-xs px-2 py-1 rounded-full inline-block mt-1
                            ${reminder.priority === 'critical' ? 'bg-red-100 text-red-700' : 
                              reminder.priority === 'important' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-blue-100 text-blue-700'
                            }
                          `}>
                            {reminder.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-surface-50 rounded-xl">
                  <div className="flex items-center space-x-2 text-surface-600">
                    <ApperIcon name="Clock" className="h-5 w-5" />
                    <span className="font-medium">Departure in:</span>
                    <span className="text-primary font-bold">2 hours 30 minutes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature