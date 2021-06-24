import { useEffect, useState } from 'react';
import { DbFirebase } from '../services/firebase';
import { useAuthHook } from '../hooks/useAuth';

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted: boolean;
  isAnswered: boolean;
  likeCount: number;
  likeId: string | undefined;
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
    likes: Record<string, { authorId: string }>;
  }
>;

export const useRoom = (roomId: string) => {
  const [Title, setTitle] = useState<Questions[]>([]);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const { User } = useAuthHook();

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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === User?.id,
            )?.[0],
          };
        },
      );
      setTitle(room.val().title);
      setQuestions(parsedQuestion);
    });

    return () => {
      roomRef.off('value');
    };
  }, [roomId, User?.id]);
  return { Title, questions };
};
