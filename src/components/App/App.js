import React, { useState } from 'react';
import Participant from '../Participant';
import Spectator from '../Spectator';

function App() {
  const [name, setName] = useState('');

  return name ? <Participant name={name} /> : <Spectator onSubmitName={setName} />;
}

export default App;
