// src/components/Sidebar.tsx
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../images/logo_sistema_rh.jpg';

export default function Sidebar() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo do Sistema RH" className="sidebar-logo" />
        </div>

        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/employees">Funcionários</a></li>
          <li><a href="/vacations">Férias</a></li>
          <li><Link to="/evaluations">Avaliações</Link></li>
          <li><Link to="/jobs">Vagas</Link></li>
          <li><Link to="/announcements">Comunicados</Link></li>
          <li><Link to="/reports">Relatórios</Link></li>
        </ul>
      </nav>
      <main className="content">
        {/* O conteúdo principal será renderizado aqui */}
      </main>
    </div>
  );
}
