import LogoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../Components/button';

export const Room = () => {
  return (
    <div id='page-room'>
      <header>
        <div className='header__content'>
          <img src={LogoImg} alt='LetMeAsk' />
          <div className='code-room'>Meu codigo</div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala de React</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder='O que você quer perguntar?'></textarea>
          <footer>
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>
            </span>
            <Button type='submit'>Enviar pergunta.</Button>
          </footer>
        </form>
      </main>
    </div>
  );
};
