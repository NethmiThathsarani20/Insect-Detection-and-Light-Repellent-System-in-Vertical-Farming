import React, { useEffect } from 'react';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const AlertNotification = ({ detection, onClose }) => {
  useEffect(() => {
    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getLEDColor = (pattern) => {
    switch (pattern) {
      case 2:
        return { color: '#3498db', name: 'Blue' };
      case 4:
        return { color: '#c0392b', name: 'Red' };
      default:
        return { color: '#9b59b6', name: 'Purple' };
    }
  };

  const ledInfo = getLEDColor(detection.pattern);

  return (
    <div className="alert">
      <button className="alert-close" onClick={onClose}>
        <FaTimes />
      </button>
      <div className="alert-header">
        <FaExclamationTriangle className="alert-icon" />
        Insect Detected!
      </div>
      <div className="alert-body">
        <strong>{detection.name}</strong> has been detected in the vertical farm.
        <br />
        <strong>Confidence:</strong> {detection.confidence}%
        <br />
        <strong>Time:</strong> {detection.time}
        <br />
        <strong>Date:</strong> {detection.date}
        <br />
        <div className="detection-led" style={{ marginTop: '10px' }}>
          <strong>LED Repellent:</strong>
          <span 
            className="led-indicator" 
            style={{ backgroundColor: ledInfo.color, color: ledInfo.color }}
          ></span>
          {ledInfo.name} Light Activated
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;
