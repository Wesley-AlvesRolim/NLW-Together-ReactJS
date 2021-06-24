import { useParams } from 'react-router-dom';

import LogoImg from '../assets/images/logo.svg';
import DeleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';

import { Button } from '../Components/button';
import { RoomCode } from '../Components/room-code';
import { Question } from '../Components/Question';
import { useRoom } from '../hooks/useRoom';
import { DbFirebase } from '../services/firebase';

type paramsType = {
  id: string;
};

export const AdminRoom = () => {
  const params = useParams<paramsType>();
  const roomId = params.id;
  const { Title, questions } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    const isToRemove: boolean = window.confirm(
      'Tem certeza que você quer apagar essa pergunta?',
    );
    if (isToRemove) {
      await DbFirebase.ref(
        'rooms/' + roomId + '/questions/' + questionId,
      ).remove();
    }
  }

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
              >
                <button
                  onClick={() => {
                    handleDeleteQuestion(question.id);
                  }}
                >
                  <img src={DeleteImg} alt='Apague essa pergunta.' />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
};
