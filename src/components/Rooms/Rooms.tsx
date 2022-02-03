import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateName from '../../utils/generateName';
import Card from '../Card';

interface Room {
  id: number;
  spectators: Array<{}>;
  participants: Array<{ id: number; name: string }>;
}

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/guest`);
    eventSource.onmessage = event => {
      setRooms(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="text-4xl">
        {Boolean(rooms?.length)
          ? 'Join a room or create a new one'
          : 'Create a room to start estimating'}
      </p>
      <div className="mt-24 flex">
        {rooms.map(room => (
          <Card key={room.id} onClick={() => navigate(`/${room.id}`)}>
            {room.spectators.length > 0 && (
              <p className="text-sm mb-4">
                {room.spectators.length} {room.spectators.length === 1 ? 'Spectator' : 'Spectators'}
              </p>
            )}
            {room.participants.map(participant => (
              <p key={participant.id} className="text-sm">
                {participant.name}
              </p>
            ))}
          </Card>
        ))}
        <Card onClick={() => navigate(`/${generateName()}`)}>+</Card>
      </div>
    </div>
  );
}

export default Rooms;
