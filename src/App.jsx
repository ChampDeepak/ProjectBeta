import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LandingPage from './Common/LandingPage';
import Login from './Common/Auth/Login';
import Signup from './Common/Auth/Signup';
import TeacherDashboard from './Teacher/TeacherDashboard';
import StudentDashboard from './Student/StudentDashboard';
import NotFound from './Common/NotFound';
import HomeComponent from './Student/HomeComponent';
import SubjectList from './Student/SubjectList';
import SubjectComponent from './Student/SubjectComponent';
import Header from './Student/Header';

// Layout component for student routes with header
const StudentLayout = ({ userName, userInitials }) => {
  return (
    <>
      <Header userName={userName} userInitials={userInitials} />
      <Outlet />
    </>
  );
};

export default function App() {
  const userName = 'Rahul Singh';
  const userInitials = 'RS';
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Teacher routes - direct access without nesting */}
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        
        {/* Student routes with layout */}
        <Route element={<StudentLayout userName={userName} userInitials={userInitials} />}>
          <Route path="/student" element={<StudentDashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomeComponent />} />
            <Route path="subjects" element={<SubjectList />} />
            <Route path="subject/:id" element={<SubjectComponent />} />
          </Route>
        </Route>
        
        {/* Error routes */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}