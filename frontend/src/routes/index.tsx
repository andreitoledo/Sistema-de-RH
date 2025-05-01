// src/routes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Vacations from '../pages/Vacations';
import Evaluations from '../pages/Evaluations';
import Jobs from '../pages/Jobs';
import Announcements from '../pages/Announcements';
import Reports from '../pages/Reports';
import DefaultLayout from '../layouts/DefaultLayout';

export default function AppRoutes() {
  const isAuthenticated = !!localStorage.getItem('token'); // ou outra lógica de auth

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      {isAuthenticated ? (
        <>
          <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/employees" element={<DefaultLayout><Employees /></DefaultLayout>} />
          <Route path="/vacations" element={<DefaultLayout><Vacations /></DefaultLayout>} />
          <Route path="/evaluations" element={<DefaultLayout><Evaluations /></DefaultLayout>} />
          <Route path="/jobs" element={<DefaultLayout><Jobs /></DefaultLayout>} />
          <Route path="/announcements" element={<DefaultLayout><Announcements /></DefaultLayout>} />
          <Route path="/reports" element={<DefaultLayout><Reports /></DefaultLayout>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
