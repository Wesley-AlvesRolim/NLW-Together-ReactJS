import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LogoImg from '../assets/images/logo.svg';
import '../styles/room.scss';

import { Button } from '../Components/button';
import { RoomCode } from '../Components/room-code';
import { useAuthHook } from '../hooks/useAuth';
import { DbFirebase } from '../services/firebase';

type paramsType = {
  id: string;
};

type firebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighLighted: boolean;
    isAnswered: boolean;
  }
>;

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
};

export const Room = () => {
  const { User } = useAuthHook();
  const params = useParams<paramsType>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  const [Title, setTitle] = useState<Questions[]>([]);
  const [questions, setQuestions] = useState<Questions[]>([]);

  useEffect(() => {
    const roomRef = DbFirebase.ref('rooms/' + roomId);
    roomRef.on('value', room => {
      const firebaseQuestion: firebaseQuestions = room.val().questions ?? {};
      const parsedQuestion = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighLighted: value.isHighLighted,
            isAnswered: value.isAnswered,
          };
        },
      );
      setTitle(room.val().title);
      setQuestions(parsedQuestion);
    });
  }, [roomId]);

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

        {questions[0]
          ? questions.map(el => (
              <div>
                {' '}
                {el.content} {el.author}
              </div>
            ))
          : `vazio`}
      </main>
    </div>
  );
};
