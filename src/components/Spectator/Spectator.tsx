import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../Card';
import { ReactComponent as ResetIcon } from './reset.svg';

interface Participant {
  id: number;
  name: string;
  estimate?: number;
}

function Spectator() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/${roomId}/spectator`);
    eventSource.onmessage = event => {
      setParticipants(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, [roomId]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(`/${roomId}/${inputRef.current?.value ?? ''}`);
  }

  function reset() {
    fetch(`${process.env.REACT_APP_API_URL}/${roomId}/reset`, { method: 'POST' });
  }

  const gotAllParticipants = participants.every(({ estimate }) => typeof estimate === 'number');

  return (
    <div className="h-full flex flex-col items-center justify-evenly">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="rounded-l-lg border-green-500 border-2 text-gray-900 focus:outline-none"
          ref={inputRef}
          name="name"
          type="text"
          placeholder="Name"
        />
        <button
          className="rounded-r-lg bg-green-500 px-8 text-white font-bold focus:outline-none"
          type="submit"
        >
          Join
        </button>
      </form>
      <div className="flex">
        {participants.length === 0 && <p>No one has joined yet.</p>}
        {participants.map(participant => (
          <div key={participant.id}>
            <Card className="mx-4" filled={typeof participant.estimate === 'number'}>
              {gotAllParticipants && participant.estimate}
            </Card>
            <p className="mt-4 text-xl text-center">{participant.name}</p>
          </div>
        ))}
      </div>
      <button className="focus:outline-none" type="button" onClick={reset}>
        <ResetIcon className="w-8 h-8 text-green-500 fill-current" />
      </button>
    </div>
  );
}

export default Spectator;
