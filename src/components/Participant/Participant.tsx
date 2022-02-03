import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card';

function Participant() {
  const { roomId, name } = useParams();
  const [id, setId] = useState(0);
  const [estimate, setEstimate] = useState<number | undefined>();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/${roomId}/participant?name=${name}`,
    );
    eventSource.onmessage = event => {
      setId(JSON.parse(event.data));
      setEstimate(undefined);
    };

    return () => eventSource.close();
  }, [roomId, name]);

  async function send(estimate: number) {
    await fetch(`${process.env.REACT_APP_API_URL}/${roomId}/estimation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estimate }),
    });
    setEstimate(estimate);
  }

  return (
    <div className="h-full flex items-center justify-center">
      {[0, 1, 2, 3, 5, 8].map(option => (
        <Card
          key={option}
          className="mx-4"
          onClick={() => send(option)}
          filled={option === estimate}
        >
          {option}
        </Card>
      ))}
    </div>
  );
}

export default Participant;
