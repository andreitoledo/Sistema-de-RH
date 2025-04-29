import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Employees from '../pages/Employees';
import Vacations from '../pages/Vacations';
import DefaultLayout from '../layouts/DefaultLayout';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
        <Route path="/employees" element={<DefaultLayout><Employees /></DefaultLayout>} />
        <Route path="/vacations" element={<DefaultLayout><Vacations /></DefaultLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
