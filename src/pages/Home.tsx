import { useHistory } from 'react-router-dom';
import { authFirebase, firebase } from '../services/firebase';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

import { Button } from '../Components/button';

export const Home = () => {
  const history = useHistory();
  function HandleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();
    authFirebase
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        history.push('/rooms/new');
      })
      .catch(error => {
        history.push('/');
      });
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
          <form>
            <input type='text' placeholder='Digite o código da sala' />
            <Button type='submit'>Entrar na sala.</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
