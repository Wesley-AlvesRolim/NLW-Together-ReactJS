import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import LogoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../Components/button';
import { RoomCode } from '../Components/room-code';
import { Question } from '../Components/Question';
import { useAuthHook } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { DbFirebase } from '../services/firebase';

type paramsType = {
  id: string;
};

export const Room = () => {
  const params = useParams<paramsType>();
  const roomId = params.id;
  const { User } = useAuthHook();
  const { Title, questions } = useRoom(roomId);
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') return;
    if (!User) throw new Error('You must be logged in');

    const question = {
      content: newQuestion,
      author: { name: User.name, avatar: User.avatar },
      isHighLighted: false,
      isAnswered: false,
    };
    await DbFirebase.ref('rooms/' + roomId + '/questions').push(question);
    setNewQuestion('');
  }

  return (
    <div id='page-room'>
      <header>
        <div className='header__content'>
          <img src={LogoImg} alt='LetMeAsk' />
          <div className='code-room'>
            <RoomCode code={roomId} />
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

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          ></textarea>
          <footer>
            {User ? (
              <div className='user-info'>
                <img src={User.avatar} alt={User.name} />
                <span>{User.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>
              </span>
            )}
            <Button disabled={!User || newQuestion.trim() === ''} type='submit'>
              Enviar pergunta.
            </Button>
          </footer>
        </form>

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
