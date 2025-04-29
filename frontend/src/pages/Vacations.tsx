// src/pages/Vacations.tsx

import { useEffect, useState } from 'react';
import api from '../services/api';
import VacationModal from '../components/VacationModal';
import { toast } from 'react-toastify';
import '../styles/modal.css';
import '../styles/icons.css';

interface Vacation {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  status: string;
  employee?: { name: string };
}

interface Employee {
  id: number;
  name: string;
}

export default function Vacations() {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Vacation | undefined>(undefined);

  function load() {
    api.get('/vacations').then(res => setVacations(res.data));
    api.get('/employees').then(res => setEmployees(res.data));
  }

  useEffect(() => {
    load();
  }, []);

  function handleSave(data: any) {
    const req = selected
      ? api.patch(`/vacations/${selected.id}`, data)
      : api.post('/vacations', data);

    req
      .then(() => {
        toast.success('Férias salvas com sucesso!');
        setModalOpen(false);
        setSelected(undefined);
        load();
      })
      .catch(() => toast.error('Erro ao salvar férias.'));
  }

  function handleDelete(id: number) {
    if (confirm('Deseja excluir este registro de férias?')) {
      api.delete(`/vacations/${id}`)
        .then(() => {
          toast.success('Férias excluídas com sucesso!');
          load();
        })
        .catch(() => toast.error('Erro ao excluir férias.'));
    }
  }

  return (
    <div>
      <h2>Controle de Férias</h2>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Funcionário</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vacations.map(vac => (
            <tr key={vac.id}>
              <td>{vac.id}</td>
              <td>{vac.employee?.name || employees.find(e => e.id === vac.employeeId)?.name}</td>
              <td>{vac.startDate.split('T')[0]}</td>
              <td>{vac.endDate.split('T')[0]}</td>
              <td>{vac.status}</td>
              <td>
                <button onClick={() => {
                  setSelected(vac);
                  setModalOpen(true);
                }} className="icon-button blue">✏️</button>

                <button onClick={() => handleDelete(vac.id)} className="icon-button red">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="floating-button"
        onClick={() => {
          setSelected(undefined);
          setModalOpen(true);
        }}
      >
        +
      </button>

      <VacationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(undefined);
        }}
        onSave={handleSave}
        initialData={selected}
        title={selected ? 'Editar Férias' : 'Nova Férias'}
        employees={employees}
      />
    </div>
  );
}
