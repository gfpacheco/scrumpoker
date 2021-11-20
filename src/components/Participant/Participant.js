import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Card from '../Card';

function Participant({ className, roomId, name, ...rest }) {
  const [id, setId] = useState(0);
  const [value, setValue] = useState();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/${roomId}/participant?name=${encodeURIComponent(name)}`,
    );
    eventSource.onmessage = event => {
      setId(JSON.parse(event.data));
      setValue();
    };

    return () => eventSource.close();
  }, [roomId, name]);

  async function send(estimate) {
    await fetch(`${process.env.REACT_APP_API_URL}/${roomId}/estimation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estimate }),
    });
    setValue(estimate);
  }

  return (
    <div className={classNames(className, 'h-full flex items-center justify-center')} {...rest}>
      {[0, 1, 2, 3, 5, 8].map(option => (
        <Card key={option} onClick={() => send(option)} filled={option === value}>
          {option}
        </Card>
      ))}
    </div>
  );
}

export default Participant;
