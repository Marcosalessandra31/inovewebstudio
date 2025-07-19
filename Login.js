import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { email, password });
      localStorage.setItem('session', res.data.session);
      navigate('/dashboard');
    } catch (e) {
      alert("Login inválido");
    }
  };

  return (
    <div>
      <h1>InoveWebStudio - Login</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Entrar</button>
    </div>
  );
}