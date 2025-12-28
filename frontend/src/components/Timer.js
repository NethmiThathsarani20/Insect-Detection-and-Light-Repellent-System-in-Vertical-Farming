import React from 'react';
import { FaClock } from 'react-icons/fa';

const Timer = ({ isActive, remainingTime }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card">
      <div className="card-header">
        <FaClock /> Treatment Duration
      </div>
      <div>
        <div 
          className="timer-display"
          style={{ color: isActive ? (remainingTime > 0 ? '#2980b9' : '#ccc') : '#ccc' }}
        >
          {formatTime(remainingTime)}
        </div>
        <div className="timer-label">Time Remaining</div>
      </div>
    </div>
  );
};

export default Timer;
