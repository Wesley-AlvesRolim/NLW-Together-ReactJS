import { useEffect, useState } from 'react';
import { DbFirebase } from '../services/firebase';

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

export const useRoom = (roomId: string) => {
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
  return { Title, questions };
};
