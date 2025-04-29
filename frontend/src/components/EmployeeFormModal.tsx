import Modal from 'react-modal';
import { useState } from 'react';
import api from '../services/api';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: () => void;
}

Modal.setAppElement('#root');

export default function EmployeeFormModal({ isOpen, onRequestClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    birthday: '',
    hiredAt: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    try {
      await api.post('/employees', {
        name: form.name,
        position: form.position,
        department: form.department,
        email: form.email,
        phone: form.phone,
        salary: parseFloat(form.salary.replace(',', '.')), // garante Float
        birthday: new Date(form.birthday).toISOString(),   // ISO string
        hiredAt: new Date(form.hiredAt).toISOString(),
        status: true
      });
  
      onSuccess();
      onRequestClose();
    } catch (error) {
      alert('Erro ao salvar funcionário.');
      console.error(error);
    }
  }
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Novo Funcionário">
      <h2>Novo Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
        <input name="position" placeholder="Cargo" value={form.position} onChange={handleChange} required />
        <input name="department" placeholder="Departamento" value={form.department} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} required />
        <input name="salary" type="number" step="0.01" placeholder="Salário" value={form.salary} onChange={handleChange} required />
        <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
        <input name="hiredAt" type="date" value={form.hiredAt} onChange={handleChange} required />
        <br />
        <button type="submit">Salvar</button>
        <button type="button" onClick={onRequestClose}>Cancelar</button>
      </form>
    </Modal>
  );
}
