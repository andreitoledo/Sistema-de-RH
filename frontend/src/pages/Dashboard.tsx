// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../services/api';
import '../styles/dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [birthdays, setBirthdays] = useState<number[]>([]);
  const [jobsSummary, setJobsSummary] = useState({ open: 0, closed: 0 });
  const [performance, setPerformance] = useState([]);
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    api.get('/reports/birthdays').then((res) => {
      const counts = Array(12).fill(0);
      res.data.forEach((emp: any) => {
        const month = new Date(emp.birthday).getMonth();
        counts[month]++;
      });
      setBirthdays(counts);
    });

    api.get('/reports/jobs-summary').then(res => setJobsSummary(res.data));
    api.get('/reports/performance').then(res => setPerformance(res.data));
    api.get('/reports/upcoming-vacations').then(res => setVacations(res.data));
  }, []);

  const birthdaysData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Aniversariantes por Mês',
        data: birthdays,
        fill: false,
        borderColor: 'yellow',
        backgroundColor: 'yellow',
        tension: 0.2,
      },
    ],
  };

  const birthdaysOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
      title: { display: true, text: 'Gráfico de Aniversariantes', color: 'white' },
    },
    scales: {
      x: { ticks: { color: 'white' }, grid: { color: '#333' } },
      y: { ticks: { color: 'white' }, grid: { color: '#333' } },
    },
  };

  const jobsData = {
    labels: ['Abertas', 'Fechadas'],
    datasets: [{
      data: [jobsSummary.open, jobsSummary.closed],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }],
  };

  const performanceData = {
    labels: performance.map((p: any) => p.employee?.name || 'Funcionário'),
    datasets: [{
      label: 'Média de Notas',
      data: performance.map((p: any) => p.avgScore),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };

  const vacationsBarData = {
    labels: vacations.map((v: any) => v.employee?.name || 'Funcionário'),
    datasets: [{
      label: 'Dias até as Férias',
      data: vacations.map((v: any) => {
        const start = new Date(v.startDate);
        const today = new Date();
        return Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }),
      backgroundColor: '#FFA500',
    }],
  };

  const vacationsBarOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    plugins: {
      legend: { labels: { color: 'white' } },
      title: {
        display: true,
        text: 'Próximas Férias (em dias)',
        color: 'white',
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#333' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#333' },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="info-cards">
  <div className="card">
    <h3>Aniversariantes</h3>
    <p>{birthdays.reduce((acc, val) => acc + val, 0)}</p>
  </div>
  <div className="card">
    <h3>Vagas Abertas</h3>
    <p>{jobsSummary.open}</p>
  </div>
  <div className="card">
    <h3>Média de Avaliações</h3>
    <p>
      {performance.length > 0
        ? (performance.reduce((acc, curr) => acc + curr.avgScore, 0) / performance.length).toFixed(1)
        : '0.0'}
    </p>
  </div>
  <div className="card">
    <h3>Férias Próximas</h3>
    <p>{vacations.length}</p>
  </div>
</div>

      <div className="chart-wrapper"><Line data={birthdaysData} options={birthdaysOptions} /></div>
      <div className="chart-wrapper"><Pie data={jobsData} /></div>
      <div className="chart-wrapper"><Bar data={performanceData} /></div>
      <div className="chart-wrapper"><Bar data={vacationsBarData} options={vacationsBarOptions} /></div>
    </div>
  );
}
