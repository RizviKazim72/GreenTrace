/*
 * Imports
*/

import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/landing/HomePage'
import { LoginPage, SignUpPage } from '../pages/auth'
import NotFoundPage from '../pages/NotFoundPage'

/*
 * Main Function 
*/

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Authentication Routes */}
      <Route path="/auth/login" element={        
          <LoginPage />
      } />
      
      <Route path="/auth/signup" element={
          <SignUpPage />
      } />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes