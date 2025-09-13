import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { Layout } from './Layout';
import { AcademicianDashboard } from './academician/AcademicianDashboard';
import { StudentDashboard } from './student/StudentDashboard';
import NotFound from '../pages/NotFound';

export function AppRouter() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route 
          path="/" 
          element={
            user.role === 'academician' ? (
              <AcademicianDashboard />
            ) : (
              <StudentDashboard />
            )
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}