// src/pages/Jobs.tsx

import { useEffect, useState } from 'react';
import api from '../services/api';
import JobModal from '../components/JobModal';
import { toast } from 'react-toastify';
import '../styles/modal.css';
import '../styles/icons.css';

interface Job {
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  status: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  function loadJobs() {
    api.get('/jobs').then(res => setJobs(res.data));
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function handleSave(data: any) {
    const req = selectedJob
      ? api.patch(`/jobs/${selectedJob.id}`, data)
      : api.post('/jobs', data);

    req
      .then(() => {
        toast.success('Vaga salva com sucesso!');
        setModalOpen(false);
        setSelectedJob(null);
        loadJobs();
      })
      .catch(() => toast.error('Erro ao salvar vaga.'));
  }

  function handleDelete(id: number) {
    if (confirm('Deseja excluir esta vaga?')) {
      api.delete(`/jobs/${id}`)
        .then(() => {
          toast.success('Vaga excluída com sucesso!');
          loadJobs();
        })
        .catch(() => toast.error('Erro ao excluir vaga.'));
    }
  }

  return (
    <div>
      <h2>Vagas Disponíveis</h2>

      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Departamento</th>
            <th>Localização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.department}</td>
              <td>{job.location}</td>
              <td>{job.status}</td>
              <td>
                <button onClick={() => {
                  setSelectedJob(job);
                  setModalOpen(true);
                }} className="icon-button blue">✏️</button>

                <button onClick={() => handleDelete(job.id)} className="icon-button red">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="floating-button"
        onClick={() => {
          setSelectedJob(null);
          setModalOpen(true);
        }}
      >
        +
      </button>

      <JobModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedJob(null);
        }}
        onSave={handleSave}
        initialData={selectedJob || undefined}
        title={selectedJob ? 'Editar Vaga' : 'Nova Vaga'}
      />
    </div>
  );
}
