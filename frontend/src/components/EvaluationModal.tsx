import Modal from 'react-modal';
import { useState, useEffect } from 'react';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  title: string;
  employees: { id: number; name: string }[];
}

Modal.setAppElement('#root');

export default function EvaluationModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
  employees,
}: EvaluationModalProps) {
  const [form, setForm] = useState({
    employeeId: '',
    evaluationDate: '',
    score: '',
    comments: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        evaluationDate: initialData.evaluationDate?.split('T')[0] || '',
        score: initialData.score?.toString() || '',
      });
    } else if (isOpen) {
      setForm({
        employeeId: '',
        evaluationDate: '',
        score: '',
        comments: '',
      });
    }
  }, [initialData, isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      ...form,
      employeeId: parseInt(form.employeeId),
      score: parseInt(form.score),
      evaluationDate: new Date(form.evaluationDate).toISOString(),
    };
    onSave(data);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Funcionário
          <select name="employeeId" value={form.employeeId} onChange={handleChange} required>
            <option value="">Selecione</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data da Avaliação
          <input type="date" name="evaluationDate" value={form.evaluationDate} onChange={handleChange} required />
        </label>

        <label>
          Nota
          <input type="number" name="score" value={form.score} onChange={handleChange} min={0} max={100} required />
        </label>

        <label>
          Comentários
          <textarea name="comments" value={form.comments} onChange={handleChange} required rows={4} />
        </label>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
