import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import '../styles/button.scss';

import { Button } from '../Components/button';
import { useAuthHook } from '../hooks/useAuth';
import { DbFirebase } from '../services/firebase';

export const NewRoom = () => {
  const history = useHistory();
  const { User } = useAuthHook();

  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') return;

    const roomRef = DbFirebase.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: User?.id,
    });
    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={ilustrationImg} alt='Ilustração de pperguntas e respostas' />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='LetMeAsk' />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type='submit'>Criar sala.</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to='/'>Clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
