import { useState } from 'react';
import Participant from '../Participant';
import Spectator from '../Spectator';

export interface RoomProps {
  roomId: number;
}

function Room({ roomId }: RoomProps) {
  const [name, setName] = useState('');

  return name ? (
    <Participant roomId={roomId} name={name} />
  ) : (
    <Spectator roomId={roomId} onSubmitName={setName} />
  );
}

export default Room;
