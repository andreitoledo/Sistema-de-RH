// src/pages/Login.tsx
import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    api.post('/auth/login', form)
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        navigate('/dashboard'); // ou qualquer página inicial do sistema
      })
      .catch(() => alert('Login inválido'));
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />

        <label>Senha</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
