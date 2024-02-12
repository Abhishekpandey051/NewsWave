import React, { useState, useEffect } from 'react';

function TimeDate() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // const nextHourTime = new Date();
  
  useEffect(() => {
    // Update the current time every second
    const timerID = setInterval(() => tick(), 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(timerID);
  }, []); // Empty dependency array to run effect only once on component mount

  function tick() {
    setCurrentTime(new Date());
  }

  // Format the current time
  // const oneHr = currentTime.to
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div>
      <h1>Current Time:</h1>
      <h2>{formattedTime }</h2>
    </div>
  );
}

export default TimeDate;
