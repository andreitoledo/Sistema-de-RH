import Modal from 'react-modal';
import { useState, useEffect } from 'react';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  title: string;
}

Modal.setAppElement('#root');

export default function AnnouncementModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}: AnnouncementModalProps) {
  const [form, setForm] = useState({
    title: '',
    message: '',
    audience: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        message: initialData.message || '',
        audience: initialData.audience || '',
      });
    } else if (isOpen) {
      setForm({
        title: '',
        message: '',
        audience: '',
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
          <input type="text" name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Mensagem
          <textarea name="message" value={form.message} onChange={handleChange} required rows={4} />
        </label>

        <label>
          Público-alvo
          <select name="audience" value={form.audience} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="todos">Todos</option>
            <option value="TI">TI</option>
            <option value="RH">RH</option>
            <option value="Administrativo">Administrativo</option>
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
