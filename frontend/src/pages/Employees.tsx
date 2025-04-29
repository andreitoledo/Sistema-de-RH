import { useEffect, useState } from 'react';
import api from '../services/api';

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

  useEffect(() => {
    api.get<Employee[]>('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error('Erro ao carregar funcionários:', err));
  }, []);

  return (
    <div>
      <h2>Funcionários</h2>
      <button
        style={{ marginBottom: '20px' }}
        onClick={() => alert('Abrir modal/cadastro')}
      >
        Novo Funcionário
      </button>

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
