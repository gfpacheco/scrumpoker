import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Card from '../Card';

export interface RoomsProps extends React.ComponentPropsWithoutRef<'div'> {
  onSubmitRoomId(roomId: number): void;
}

interface Room {
  id: number;
  spectators: Array<{}>;
  participants: Array<{ id: number; name: string }>;
}

function Rooms({ className, onSubmitRoomId, ...rest }: RoomsProps) {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/guest`);
    eventSource.onmessage = event => {
      setRooms(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  return (
    <div
      className={classNames(className, 'h-full flex flex-col items-center justify-center')}
      {...rest}
    >
      <p className="text-4xl">
        {Boolean(rooms?.length)
          ? 'Choose a room or create a new one'
          : 'Create a room to start estimating'}
      </p>
      <div className="mt-24 flex">
        {rooms.map(room => (
          <Card key={room.id} onClick={() => onSubmitRoomId(room.id)}>
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
        <Card onClick={() => onSubmitRoomId(Date.now())}>+</Card>
      </div>
    </div>
  );
}

export default Rooms;
