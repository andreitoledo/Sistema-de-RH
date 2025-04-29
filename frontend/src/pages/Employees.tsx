// src/pages/Employees.tsx

import { useEffect, useState } from 'react';
import api from '../services/api';
import CrudModal from '../components/CrudModal';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
          toast.success('Funcionário atualizado com sucesso.');
          loadEmployees();
          setModalOpen(false);
          setSelectedEmployee(undefined);
        })
        .catch(err => {
          toast.success('Erro ao salvar funcionário.');
          console.error(err);
        });
    } else {
      api.post('/employees', { ...data, status: true })
        .then(() => {
          toast.success('Funcionário cadastrado com sucesso.');
          loadEmployees();
          setModalOpen(false);
          setSelectedEmployee(undefined);
        })
        .catch(err => {
          toast.success('Erro ao salvar funcionário.');
          console.error(err);
        });
    }
  }

  function handleDelete(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Deseja realmente excluir este funcionário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/employees/${id}`)
          .then(() => {
            toast.success('Funcionário excluído com sucesso.');
            loadEmployees();
          })
          .catch(err => {
            toast.error('Erro ao excluir funcionário.');
            console.error(err);
          });
      }
    });
  }


  return (
    <div>
      <h2>Funcionários</h2>
      <button
        className="fab-button"
        title="Novo Funcionário"
        onClick={() => {
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
                }} title="Editar" style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '6px',
                  marginRight: '6px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}><FaEdit /></button>
                <button onClick={() => handleDelete(emp.id!)} title="Excluir" style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '6px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
