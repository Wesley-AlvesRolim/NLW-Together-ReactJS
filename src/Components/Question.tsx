import { ReactNode } from 'react';
import '../styles/question.scss';

type QuestionsProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighLighted?: boolean;
  isAnswered?: boolean;
  children?: ReactNode;
};

export const Question = (props: QuestionsProps) => {
  return (
    <div
      className={`question ${props.isAnswered ? 'answered' : ''} ${
        props.isHighLighted && !props.isAnswered ? 'highLighted' : ''
      }`}
    >
      <p>{props.content}</p>
      <footer>
        <div className='user-info'>
          <img src={props.author.avatar} alt={props.author.name} />
          <span>{props.author.name}</span>
        </div>
        <div>{props.children}</div>
      </footer>
    </div>
  );
};
