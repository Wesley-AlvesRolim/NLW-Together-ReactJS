import { useParams } from 'react-router-dom';

import LogoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../Components/button';
import { RoomCode } from '../Components/room-code';
import { Question } from '../Components/Question';
import { useRoom } from '../hooks/useRoom';

type paramsType = {
  id: string;
};

export const AdminRoom = () => {
  const params = useParams<paramsType>();
  const roomId = params.id;
  const { Title, questions } = useRoom(roomId);

  return (
    <div id='page-room'>
      <header>
        <div className='header__content'>
          <img src={LogoImg} alt='LetMeAsk' />
          <div>
            <div className='code-room'>
              <RoomCode code={roomId} />
            </div>
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala: {Title}</h1>
          {questions.length > 0 && (
            <span> {questions.length} pergunta(s).</span>
          )}
        </div>

        <div className='question-list'>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};
