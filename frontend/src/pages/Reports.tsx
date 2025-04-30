// src/pages/Reports.tsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/modal.css';
import '../styles/icons.css';

export default function Reports() {
  const [birthdays, setBirthdays] = useState<any[]>([]);
  const [upcomingVacations, setUpcomingVacations] = useState<any[]>([]);
  const [performance, setPerformance] = useState<any[]>([]);
  const [jobsSummary, setJobsSummary] = useState<any>({ open: 0, closed: 0 });

  useEffect(() => {
    api.get('/reports/birthdays').then((res) => setBirthdays(res.data));
    api.get('/reports/upcoming-vacations').then((res) => setUpcomingVacations(res.data));
    api.get('/reports/performance').then((res) => setPerformance(res.data));
    api.get('/reports/jobs-summary').then((res) => setJobsSummary(res.data));
  }, []);

  return (
    <div>
      <h2>Relatórios</h2>

      <section>
        <h3>Aniversariantes do Mês</h3>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Departamento</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {birthdays.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.department}</td>
                <td>{new Date(e.birthday).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Férias nos Próximos 30 Dias</h3>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Início</th>
              <th>Fim</th>
            </tr>
          </thead>
          <tbody>
            {upcomingVacations.map((v) => (
              <tr key={v.id}>
                <td>{v.employee?.name}</td>
                <td>{new Date(v.startDate).toLocaleDateString('pt-BR')}</td>
                <td>{new Date(v.endDate).toLocaleDateString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Desempenho dos Funcionários</h3>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Média de Notas</th>
              <th>Último Comentário</th>
            </tr>
          </thead>
          <tbody>
            {performance.map((p) => (
              <tr key={p.employeeId}>
                <td>{p.employee?.name}</td>
                <td>{p.avgScore}</td>
                <td>{p.lastComment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Resumo de Vagas</h3>
        <p>Abertas: {jobsSummary.open}</p>
        <p>Fechadas: {jobsSummary.closed}</p>
      </section>
    </div>
  );
}
