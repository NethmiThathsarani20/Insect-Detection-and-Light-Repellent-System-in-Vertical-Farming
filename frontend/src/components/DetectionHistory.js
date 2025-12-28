import React from 'react';
import { FaHistory } from 'react-icons/fa';

const DetectionHistory = ({ detections }) => {
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

  return (
    <div className="card">
      <div className="card-header">
        <FaHistory /> Detection History
      </div>
      <div className="detection-history">
        {detections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            No detections yet
          </div>
        ) : (
          detections.map((detection, index) => {
            const ledInfo = getLEDColor(detection.pattern);
            return (
              <div key={index} className="detection-item">
                <div className="detection-header">
                  <div className="detection-name">{detection.name}</div>
                  <div className="detection-confidence">
                    {detection.confidence}%
                  </div>
                </div>
                <div className="detection-details">
                  <div>📅 {detection.date}</div>
                  <div>🕒 {detection.time}</div>
                  <div className="detection-led">
                    💡 LED:
                    <span 
                      className="led-indicator" 
                      style={{ backgroundColor: ledInfo.color, color: ledInfo.color }}
                    ></span>
                    {ledInfo.name}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DetectionHistory;
