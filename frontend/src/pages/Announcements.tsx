import { useEffect, useState } from 'react';
import api from '../services/api';
import AnnouncementModal from '../components/AnnouncementModal';
import { toast } from 'react-toastify';
import '../styles/modal.css';
import '../styles/icons.css';

interface Announcement {
  id: number;
  title: string;
  message: string;
  audience: string;
  createdAt: string;
}

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Announcement | undefined>(undefined);

  function load() {
    api.get('/announcements').then(res => setAnnouncements(res.data));
  }

  useEffect(() => {
    load();
  }, []);

  function handleSave(data: any) {
    const req = selected
      ? api.patch(`/announcements/${selected.id}`, data)
      : api.post('/announcements', data);

    req
      .then(() => {
        toast.success('Comunicado salvo com sucesso!');
        setModalOpen(false);
        setSelected(undefined);
        load();
      })
      .catch(() => toast.error('Erro ao salvar comunicado.'));
  }

  function handleDelete(id: number) {
    if (confirm('Deseja excluir este comunicado?')) {
      api.delete(`/announcements/${id}`)
        .then(() => {
          toast.success('Comunicado excluído com sucesso!');
          load();
        })
        .catch(() => toast.error('Erro ao excluir comunicado.'));
    }
  }

  return (
    <div>
      <h2>Comunicados</h2>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Mensagem</th>
            <th>Público-alvo</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {announcements.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.title}</td>
              <td>{a.message}</td>
              <td>{a.audience}</td>
              <td>{new Date(a.createdAt).toLocaleDateString()}</td>
              <td>
                <button onClick={() => {
                  setSelected(a);
                  setModalOpen(true);
                }} className="icon-button blue">✏️</button>
                <button onClick={() => handleDelete(a.id)} className="icon-button red">🗑️</button>
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

      <AnnouncementModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelected(undefined);
        }}
        onSave={handleSave}
        initialData={selected}
        title={selected ? 'Editar Comunicado' : 'Novo Comunicado'}
      />
    </div>
  );
}
