/*
 * Imports
*/

import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/landing/HomePage'
import { LoginPage, SignUpPage } from '../pages/auth'
import DashboardPage from '../pages/dashboard/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import { ProtectedRoute, PublicRoute } from '../components/auth'

/*
 * Main Function 
*/

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Public Authentication Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/signup" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />

      {/* Legacy auth routes for backward compatibility */}
      <Route path="/auth/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/auth/signup" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes