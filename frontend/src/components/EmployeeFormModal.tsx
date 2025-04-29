import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from '../services/api';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccess: () => void;
  editingEmployee?: Employee | null;
}

interface FormData {
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: string;
  birthday: string;
  hiredAt: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  birthday: string;
  hiredAt: string;
  status: boolean;
}

Modal.setAppElement('#root');

export default function EmployeeFormModal({ isOpen, onRequestClose, onSuccess, editingEmployee }: Props) {
  const [form, setForm] = useState<FormData>({
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
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        position: editingEmployee.position,
        department: editingEmployee.department,
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        salary: editingEmployee.salary.toString(),
        birthday: editingEmployee.birthday.split('T')[0],
        hiredAt: editingEmployee.hiredAt.split('T')[0]
      });
    } else {
      setForm({
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
  }, [editingEmployee]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name: form.name,
      position: form.position,
      department: form.department,
      email: form.email,
      phone: form.phone,
      salary: parseFloat(form.salary),
      birthday: new Date(form.birthday).toISOString(),
      hiredAt: new Date(form.hiredAt).toISOString(),
      status: true
    };

    try {
      if (editingEmployee) {
        await api.put(`/employees/${editingEmployee.id}`, payload);
      } else {
        await api.post('/employees', payload);
      }

      onSuccess();
      onRequestClose();
    } catch (error) {
      alert('Erro ao salvar funcionário.');
      console.error('[ERRO SALVAR FUNCIONÁRIO]', error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cadastro de Funcionário"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>{editingEmployee ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
        <input name="position" placeholder="Cargo" value={form.position} onChange={handleChange} required />
        <input name="department" placeholder="Departamento" value={form.department} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Telefone" value={form.phone} onChange={handleChange} required />
        <input name="salary" type="number" step="0.01" placeholder="Salário" value={form.salary} onChange={handleChange} required />
        <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
        <input name="hiredAt" type="date" value={form.hiredAt} onChange={handleChange} required />
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Salvar</button>
          <button type="button" onClick={onRequestClose} style={{ marginLeft: '1rem' }}>Cancelar</button>
        </div>
      </form>
    </Modal>
  );
}
