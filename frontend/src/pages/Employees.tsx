import { useEffect, useState } from 'react';
import api from '../services/api';
import EmployeeFormModal from '../components/EmployeeFormModal';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  birthday: string;
  hiredAt: string;
  status: boolean;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  function loadEmployees() {
    api.get<Employee[]>('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error('Erro ao carregar funcionários:', err));
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleNovo() {
    setEditing(null);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (confirm('Deseja excluir este funcionário?')) {
      try {
        await api.delete(`/employees/${id}`);
        loadEmployees();
      } catch (err) {
        alert('Erro ao excluir funcionário');
        console.error(err);
      }
    }
  }

  return (
    <div>
      <h2>Funcionários</h2>
      <button onClick={handleNovo}>Novo Funcionário</button>

      <EmployeeFormModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSuccess={loadEmployees}
        editingEmployee={editing}
      />

      <table border={1} cellPadding={10} cellSpacing={0} style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button onClick={() => { setEditing(emp); setModalOpen(true); }}>Editar</button>
                <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: 10 }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
