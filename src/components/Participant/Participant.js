import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

function Participant({ className, name, ...rest }) {
  const [id, setId] = useState(0);
  const [value, setValue] = useState();

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/participant?name=${encodeURIComponent(name)}`,
    );
    eventSource.onmessage = event => {
      setId(JSON.parse(event.data));
      setValue();
    };

    return () => eventSource.close();
  }, [name]);

  async function send(value) {
    await fetch(`${process.env.REACT_APP_API_URL}/estimation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, value }),
    });
    setValue(value);
  }

  return (
    <div className={classNames(className)} {...rest}>
      {JSON.stringify(value)}
      {[0, 1, 2, 3, 5, 8].map(option => (
        <button
          key={option}
          type="button"
          style={option === value ? { background: 'green' } : undefined}
          onClick={() => send(option)}
          disabled={value !== undefined}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Participant;
