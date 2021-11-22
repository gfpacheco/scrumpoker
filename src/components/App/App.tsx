import { Route, Routes } from 'react-router-dom';
import DarkModeToggle from '../DarkModeToggle';
import Participant from '../Participant';
import Rooms from '../Rooms';
import Spectator from '../Spectator';

function App() {
  return (
    <>
      <Routes>
        <Route path=":roomId" element={<Spectator />} />
        <Route path=":roomId/:name" element={<Participant />} />
        <Route path="*" element={<Rooms />} />
      </Routes>
      <DarkModeToggle />
    </>
  );
}

export default App;
