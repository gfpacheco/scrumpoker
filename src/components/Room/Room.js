import React, { useState } from 'react';
import Participant from '../Participant';
import Spectator from '../Spectator';

function Room({ roomId }) {
  const [name, setName] = useState('');

  return name ? (
    <Participant roomId={roomId} name={name} />
  ) : (
    <Spectator roomId={roomId} onSubmitName={setName} />
  );
}

export default Room;
