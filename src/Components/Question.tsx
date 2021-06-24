import '../styles/question.scss';

type QuestionsProps = {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
};

export const Question = (props: QuestionsProps) => {
  return (
    <div className='question'>
      <p>{props.content}</p>
      <footer>
        <div className='user-info'>
          <img src={props.author.avatar} alt={props.author.name} />
          <span>{props.author.name}</span>
        </div>
      </footer>
    </div>
  );
};
