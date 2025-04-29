import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Selene RH</h2>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/employees">Funcionários</Link></li>
          <li><Link to="/vacations">Férias</Link></li>
          <li><Link to="/evaluations">Avaliações</Link></li>
          <li><Link to="/jobs">Vagas</Link></li>
          <li><Link to="/announcements">Comunicados</Link></li>
          <li><Link to="/reports">Relatórios</Link></li>
        </ul>
      </nav>
    </aside>
  );
}
