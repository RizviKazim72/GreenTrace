/*
 * Imports
*/

import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { HeaderComponent , Footer } from './components/common' 
import { AppRoutes } from './routes'
import { AuthProvider } from './contexts/AuthContext'

/*
 * Application 
*/

const App = () => {

  //  states 
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-neutral-600">Loading GreenTrace...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-50">
          <HeaderComponent />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App