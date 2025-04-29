// src/components/VacationModal.tsx

import Modal from 'react-modal';
import { useEffect, useState } from 'react';

interface VacationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  title: string;
  employees: { id: number; name: string }[];
}

Modal.setAppElement('#root');

export default function VacationModal({ isOpen, onClose, onSave, initialData, title, employees }: VacationModalProps) {
  const [form, setForm] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    status: 'approved',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        startDate: initialData.startDate?.split('T')[0] || '',
        endDate: initialData.endDate?.split('T')[0] || '',
      });
    } else if (isOpen) {
      setForm({
        employeeId: '',
        startDate: '',
        endDate: '',
        status: 'approved',
      });
    }
  }, [initialData, isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      ...form,
      employeeId: parseInt(form.employeeId),
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
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
          Início
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
        </label>

        <label>
          Fim
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} required />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange} required>
            <option value="approved">Aprovado</option>
            <option value="pending">Pendente</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary">Salvar</button>
          <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
