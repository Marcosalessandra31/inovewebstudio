import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const session = localStorage.getItem('session');

  const send = async () => {
    await axios.post('http://localhost:3000/send-message', {
      session,
      number,
      message
    });
    alert('Mensagem enviada!');
  };

  return (
    <div>
      <h1>Envio de Mensagem</h1>
      <input placeholder="Número (com DDD)" onChange={e => setNumber(e.target.value)} />
      <input placeholder="Mensagem" onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Enviar</button>
    </div>
  );
}