import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Vacations from '../pages/Vacations';
import Evaluations from '../pages/Evaluations';
import Jobs from '../pages/Jobs';
import Announcements from '../pages/Announcements';
import Reports from '../pages/Reports';
import DefaultLayout from '../layouts/DefaultLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
        <Route path="/employees" element={<DefaultLayout><Employees /></DefaultLayout>} />
        <Route path="/vacations" element={<DefaultLayout><Vacations /></DefaultLayout>} />
        <Route path="/evaluations" element={<DefaultLayout><Evaluations /></DefaultLayout>} />
        <Route path="/jobs" element={<DefaultLayout><Jobs /></DefaultLayout>} />
        <Route path="/announcements" element={<DefaultLayout><Announcements /></DefaultLayout>} />
        <Route path="/reports" element={<DefaultLayout><Reports /></DefaultLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
