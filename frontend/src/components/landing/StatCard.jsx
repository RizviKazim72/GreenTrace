import React from 'react'

/**
 * Statistics display card component
 */
const StatCard = ({ value, label }) => {
  return (
    <div>
      <div className="text-4xl font-bold text-secondary-400 mb-2">{value}</div>
      <div className="text-primary-200">{label}</div>
    </div>
  )
}

export default StatCard
