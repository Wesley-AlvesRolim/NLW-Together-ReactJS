import CopyRoomCode from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export const RoomCode = (props: RoomCodeProps) => {
  function CopyRoomCodyText() {
    alert('Copied code');
    navigator.clipboard.writeText(props.code);
  }

  return (
    <button className='room-code' onClick={CopyRoomCodyText}>
      <div>
        <img src={CopyRoomCode} alt='Copy room code' />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  );
};
