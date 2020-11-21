import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

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

  return (
    <div className={classNames(className)} {...rest}>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} name="name" type="text" />
        <button type="submit">participate</button>
      </form>
      {JSON.stringify(estimations)}
      <button type="button" onClick={reset}>
        reset
      </button>
    </div>
  );
}

export default Spectator;
