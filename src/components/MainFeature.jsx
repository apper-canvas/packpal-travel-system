import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 border border-surface-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Welcome to PackPal
            </h2>
            <p className="text-surface-600 text-lg">
              Your intelligent travel packing companion
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 text-center">
              <p className="text-sm text-surface-500 mb-1">Current Time</p>
              <p className="text-lg font-semibold text-surface-800">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
          >
            <div className="bg-primary/10 rounded-full p-3 w-fit mx-auto mb-4">
              <ApperIcon name="MapPin" className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-surface-800 mb-2">Smart Planning</h3>
            <p className="text-sm text-surface-600">
              Generate personalized packing lists based on your destination and weather
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
          >
            <div className="bg-secondary/10 rounded-full p-3 w-fit mx-auto mb-4">
              <ApperIcon name="CheckCircle" className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-surface-800 mb-2">Track Progress</h3>
            <p className="text-sm text-surface-600">
              Check off items as you pack and see your progress in real-time
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center"
          >
            <div className="bg-accent/10 rounded-full p-3 w-fit mx-auto mb-4">
              <ApperIcon name="Scale" className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-semibold text-surface-800 mb-2">Weight Calculator</h3>
            <p className="text-sm text-surface-600">
              Track the weight of your luggage to avoid airline fees
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Start Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-card p-8 border border-surface-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-surface-800 mb-2">
              Quick Start
            </h3>
            <p className="text-surface-600">
              Get started with your first packing list
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" className="h-5 w-5" />
              <span>New Trip</span>
            </div>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-surface-800">Getting Started:</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Check" className="h-4 w-4 text-primary" />
                </div>
                <span className="text-surface-700">Set your destination and travel dates</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Check" className="h-4 w-4 text-primary" />
                </div>
                <span className="text-surface-700">Choose your trip type and activities</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Check" className="h-4 w-4 text-primary" />
                </div>
                <span className="text-surface-700">Generate your personalized packing list</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-surface-800">Pro Tips:</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="bg-secondary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Lightbulb" className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-surface-700">Use the weight calculator to avoid baggage fees</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-secondary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Lightbulb" className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-surface-700">Save templates for frequently visited destinations</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-secondary/10 rounded-full p-1 mt-0.5">
                  <ApperIcon name="Lightbulb" className="h-4 w-4 text-secondary" />
                </div>
                <span className="text-surface-700">Check the last-minute list before departure</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Placeholder */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-card p-8 border border-surface-200"
      >
        <div className="text-center py-12">
          <div className="bg-surface-100 rounded-full p-6 w-fit mx-auto mb-4">
            <ApperIcon name="Luggage" className="h-12 w-12 text-surface-400" />
          </div>
          <h3 className="text-xl font-semibold text-surface-800 mb-2">
            No trips yet
          </h3>
          <p className="text-surface-600 mb-6">
            Create your first trip to start building your packing list
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Start Planning
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MainFeature