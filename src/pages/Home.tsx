import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

import { Button } from '../Components/button';
import { useAuthHook } from '../hooks/useAuth';
import { DbFirebase } from '../services/firebase';

export const Home = () => {
  const history = useHistory();
  const { User, signInWithGoogle } = useAuthHook();

  async function HandleCreateRoom() {
    if (!User) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  const [RoomCode, setRoomCode] = useState('');
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (RoomCode.trim() === '') return;
    if (!User) {
      await signInWithGoogle();
    }
    const roomRef = await DbFirebase.ref('rooms/' + RoomCode).get();
    if (!roomRef.exists()) {
      alert('Room does exists!');
      return;
    }
    history.push('rooms/' + RoomCode);
  }

  return (
    <div id='page-auth'>
      <aside>
        <img src={ilustrationImg} alt='Ilustração de perguntas e respostas' />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real.</p>
      </aside>

      <main>
        <div className='main-content'>
          <img src={logoImg} alt='LetMeAsk' />
          <button className='create-room' onClick={HandleCreateRoom}>
            <img src={googleIconImg} alt='Logo da Google' />
            Crie sua sala com o Google
          </button>
          <p className='separator'>ou entre em uma sala.</p>
          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={RoomCode}
            />
            <Button type='submit'>Entrar na sala.</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
