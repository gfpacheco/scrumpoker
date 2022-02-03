import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      {Boolean(rooms?.length) ? (
        <>
          <p className="text-4xl">Join a room</p>
          <div className="my-16 flex items-end">
            {rooms.map(room => (
              <div key={room.id} className="mx-4 flex flex-col w-44">
                <p className="mb-2 text-center">{room.id}</p>
                <Card onClick={() => navigate(`/${room.id}`)}>
                  {room.spectators.length > 0 && (
                    <p className="text-sm mb-4">
                      {room.spectators.length}{' '}
                      {room.spectators.length === 1 ? 'Spectator' : 'Spectators'}
                    </p>
                  )}
                  {room.participants.map(participant => (
                    <p key={participant.id} className="text-sm">
                      {participant.name}
                    </p>
                  ))}
                </Card>
              </div>
            ))}
          </div>
          <p className="text-4xl">
            Or{' '}
            <Link className="text-indigo-500" to={`/${generateName()}`}>
              create a new one
            </Link>
          </p>
        </>
      ) : (
        <p className="text-4xl">
          <Link className="text-indigo-500" to={`/${generateName()}`}>
            Create a room
          </Link>{' '}
          to start estimating
        </p>
      )}
    </div>
  );
}

export default Rooms;
