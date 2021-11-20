import React, { useState } from 'react';
import Room from '../Room';
import Rooms from '../Rooms';

function App() {
  const [roomId, setRoomId] = useState();

  return roomId ? <Room roomId={roomId} /> : <Rooms onSubmitRoomId={setRoomId} />;
}

export default App;
