import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { MdVideocam, MdRouter } from 'react-icons/md';

const SourceSelector = ({ currentSource, onSourceChange }) => {
  return (
    <div className="card">
      <div className="card-header">
        <FaCamera /> Video Input Source
      </div>
      <div className="btn-group">
        <button
          className={`btn ${currentSource === 'esp32' ? 'active' : ''}`}
          onClick={() => onSourceChange('esp32')}
        >
          <MdRouter className="btn-icon" />
          ESP32-CAM
        </button>
        <button
          className={`btn ${currentSource === 'webcam' ? 'active' : ''}`}
          onClick={() => onSourceChange('webcam')}
        >
          <MdVideocam className="btn-icon" />
          Webcam
        </button>
      </div>
    </div>
  );
};

export default SourceSelector;
