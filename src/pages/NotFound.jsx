import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
        >
          <ApperIcon name="MapPin" className="h-12 w-12 text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-surface-800 mb-4">Looks like you're off the map!</h2>
        <p className="text-surface-600 mb-8 max-w-md mx-auto">
          Don't worry, even the best travelers take wrong turns sometimes. 
          Let's get you back to planning your perfect trip.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Home" className="h-5 w-5" />
          <span>Back to PackPal</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound