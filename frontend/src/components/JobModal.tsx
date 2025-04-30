// src/components/JobModal.tsx

import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import '../styles/modal.css';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  title: string;
}

Modal.setAppElement('#root');

export default function JobModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title
}: JobModalProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    department: '',
    location: '',
    status: 'open'
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else if (isOpen) {
      setForm({
        title: '',
        description: '',
        department: '',
        location: '',
        status: 'open'
      });
    }
  }, [initialData, isOpen]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Descrição
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </label>

        <label>
          Departamento
          <input name="department" value={form.department} onChange={handleChange} required />
        </label>

        <label>
          Localização
          <input name="location" value={form.location} onChange={handleChange} required />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Aberta</option>
            <option value="closed">Fechada</option>
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
