import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Vacations from '../pages/Vacations';
import Evaluations from '../pages/Evaluations';
import Jobs from '../pages/Jobs';
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
      </Routes>
    </BrowserRouter>
  );
}
