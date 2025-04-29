import Modal from 'react-modal';
import { useState, useEffect } from 'react';

import './modal.css';

interface CrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  title: string;
}

Modal.setAppElement('#root');

export default function CrudModal({ isOpen, onClose, onSave, initialData, title }: CrudModalProps) {
  const [form, setForm] = useState({
    id: undefined,
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    birthday: '',
    hiredAt: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        birthday: initialData.birthday ? initialData.birthday.split('T')[0] : '',
        hiredAt: initialData.hiredAt ? initialData.hiredAt.split('T')[0] : '',
      });
    } else {
      setForm({
        id: undefined,
        name: '',
        position: '',
        department: '',
        email: '',
        phone: '',
        salary: '',
        birthday: '',
        hiredAt: ''
      });
    }
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      ...form,
      salary: parseFloat(form.salary),
      birthday: form.birthday ? new Date(form.birthday).toISOString() : null,
      hiredAt: form.hiredAt ? new Date(form.hiredAt).toISOString() : null,
      status: true,
    };


    onSave(data);
  }

  return (
    //<Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >

      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Cargo
          <input name="position" value={form.position} onChange={handleChange} required />
        </label>
        <label>
          Departamento
          <input name="department" value={form.department} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Telefone
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Salário
          <input name="salary" type="number" step="0.01" value={form.salary} onChange={handleChange} required />
        </label>
        <label>
          Nascimento
          <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
        </label>
        <label>
          Admissão
          <input name="hiredAt" type="date" value={form.hiredAt} onChange={handleChange} required />
        </label>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
