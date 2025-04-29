// src/pages/Employees.tsx

import { useEffect, useState } from 'react';
import api from '../services/api';
import CrudModal from '../components/CrudModal';

interface Employee {
  id?: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  birthday: string;
  hiredAt: string;
  status?: boolean;
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);

  function loadEmployees() {
    api.get<Employee[]>('/employees')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Erro ao carregar funcionários:', err));
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  function handleSave(data: Employee) {
    if (selectedEmployee) {
      api.put(`/employees/${selectedEmployee.id}`, data)
        .then(() => {
          loadEmployees();
          setModalOpen(false);
          setSelectedEmployee(undefined);
        })
        .catch(err => {
          alert('Erro ao salvar funcionário.');
          console.error(err);
        });
    } else {
      api.post('/employees', { ...data, status: true })
        .then(() => {
          loadEmployees();
          setModalOpen(false);
          setSelectedEmployee(undefined);
        })
        .catch(err => {
          alert('Erro ao salvar funcionário.');
          console.error(err);
        });
    }
  }

  function handleDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      api.delete(`/employees/${id}`)
        .then(loadEmployees)
        .catch(err => {
          alert('Erro ao excluir funcionário.');
          console.error(err);
        });
    }
  }

  return (
    <div>
      <h2>Funcionários</h2>
      <button onClick={() => {
        setSelectedEmployee(undefined);
        setModalOpen(true);
      }}>
        Novo Funcionário
      </button>

      <CrudModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedEmployee(undefined);
        }}
        onSave={handleSave}
        initialData={selectedEmployee}
        title={selectedEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}
      />

      <table border={1} cellPadding={10} cellSpacing={0}>
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
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>
                <button onClick={() => {
                  setSelectedEmployee(emp);
                  setModalOpen(true);
                }}>Editar</button>
                <button onClick={() => handleDelete(emp.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
