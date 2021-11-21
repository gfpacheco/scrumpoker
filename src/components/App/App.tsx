import { useState } from 'react';
import DarkModeToggle from '../DarkModeToggle';
import Room from '../Room';
import Rooms from '../Rooms';

function App() {
  const [roomId, setRoomId] = useState<number | undefined>();

  return (
    <>
      {roomId ? <Room roomId={roomId} /> : <Rooms onSubmitRoomId={setRoomId} />}
      <DarkModeToggle />
    </>
  );
}

export default App;
