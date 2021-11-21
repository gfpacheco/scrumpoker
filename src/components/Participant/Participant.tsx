import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Card from '../Card';

export interface ParticipantProps extends React.ComponentPropsWithoutRef<'div'> {
  roomId: number;
  name: string;
}

function Participant({ className, roomId, name, ...rest }: ParticipantProps) {
  const [id, setId] = useState(0);
  const [estimate, setEstimate] = useState<number | undefined>();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/${roomId}/participant?name=${encodeURIComponent(name)}`,
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
    <div className={classNames(className, 'h-full flex items-center justify-center')} {...rest}>
      {[0, 1, 2, 3, 5, 8].map(option => (
        <Card key={option} onClick={() => send(option)} filled={option === estimate}>
          {option}
        </Card>
      ))}
    </div>
  );
}

export default Participant;
