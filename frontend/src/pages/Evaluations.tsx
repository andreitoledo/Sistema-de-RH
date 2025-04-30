import { useEffect, useState } from 'react';
import api from '../services/api';
import EvaluationModal from '../components/EvaluationModal';
import { toast } from 'react-toastify';
import '../styles/modal.css';
import '../styles/icons.css';

interface Evaluation {
  id: number;
  employeeId: number;
  evaluationDate: string;
  score: number;
  comments: string;
  employee?: { name: string };
}

interface Employee {
  id: number;
  name: string;
}

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Evaluation | undefined>(undefined);

  function load() {
    api.get('/evaluations').then(res => setEvaluations(res.data));
    api.get('/employees').then(res => setEmployees(res.data));
  }

  useEffect(() => {
    load();
  }, []);

  function handleSave(data: any) {
    const req = selected
      ? api.patch(`/evaluations/${selected.id}`, data)
      : api.post('/evaluations', data);

    req
      .then(() => {
        toast.success('Avaliação salva com sucesso!');
        setModalOpen(false);
        setSelected(undefined);
        load();
      })
      .catch(() => toast.error('Erro ao salvar avaliação.'));
  }

  function handleDelete(id: number) {
    if (confirm('Deseja excluir esta avaliação?')) {
      api.delete(`/evaluations/${id}`)
        .then(() => {
          toast.success('Avaliação excluída com sucesso!');
          load();
        })
        .catch(() => toast.error('Erro ao excluir avaliação.'));
    }
  }

  return (
    <div>
      <h2>Avaliações de Funcionários</h2>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Funcionário</th>
            <th>Data</th>
            <th>Nota</th>
            <th>Comentários</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.employee?.name || employees.find(emp => emp.id === e.employeeId)?.name}</td>
              <td>{e.evaluationDate.split('T')[0]}</td>
              <td>{e.score}</td>
              <td>{e.comments}</td>
              <td>
                <button onClick={() => {
                  setSelected(e);
                  setModalOpen(true);
                }} className="icon-button blue">✏️</button>
                <button onClick={() => handleDelete(e.id)} className="icon-button red">🗑️</button>
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

      <EvaluationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(undefined);
        }}
        onSave={handleSave}
        initialData={selected}
        title={selected ? 'Editar Avaliação' : 'Nova Avaliação'}
        employees={employees}
      />
    </div>
  );
}
