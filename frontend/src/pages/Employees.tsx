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
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  function loadEmployees() {
    api.get<Employee[]>('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error('Erro ao carregar funcionários:', err));
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div>
      <h2>Funcionários</h2>
      <button onClick={() => setModalOpen(true)}>Novo Funcionário</button>

      <EmployeeFormModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSuccess={loadEmployees}
      />

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Email</th>
            <th>Telefone</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
