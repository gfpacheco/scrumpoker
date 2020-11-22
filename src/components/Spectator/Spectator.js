import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import Card from '../Card';
import { ReactComponent as ResetIcon } from './reset.svg';

function Spectator({ className, onSubmitName, ...rest }) {
  const [estimations, setEstimations] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/spectator`);
    eventSource.onmessage = event => {
      setEstimations(JSON.parse(event.data));
    };

    return () => eventSource.close();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitName(inputRef.current.value);
  }

  function reset() {
    fetch(`${process.env.REACT_APP_API_URL}/reset`, { method: 'POST' });
  }

  const gotAllEstimations = estimations.every(({ value }) => typeof value === 'number');

  return (
    <div
      className={classNames(className, 'h-full flex flex-col items-center justify-evenly')}
      {...rest}
    >
      <form className="flex" onSubmit={handleSubmit}>
        <input
          className="rounded-l-lg border-green-500 border-2 focus:outline-none"
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
        {estimations.length === 0 && <p>No one has joined yet.</p>}
        {estimations.map(estimation => (
          <div key={estimation.participant.id}>
            <Card
              value={gotAllEstimations && estimation.value}
              filled={typeof estimation.value === 'number'}
            />
            <p className="mt-4 text-xl text-center">{estimation.participant.name}</p>
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
