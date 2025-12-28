import React from 'react';
import { FaBug } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DetectedInsectDisplay = ({ detection, detectionHistory }) => {
  // Show the most recent detection or a placeholder
  const currentDetection = detection && detection.name !== 'None' ? detection : null;
  const latestDetection = currentDetection || (detectionHistory.length > 0 ? detectionHistory[0] : null);

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
    <div className="detection-display">
      {/* Video Feed */}
      <div className="video-feed-container">
        <img 
          src={`${API_BASE_URL}/video_feed`} 
          alt="Live Video Feed" 
          className="video-feed"
        />
      </div>

      {/* Detection Info */}
      {currentDetection ? (
        <div className="detection-active">
          <div className="detection-status-badge">
            🚨 ACTIVE DETECTION
          </div>
          <div className="detection-info-grid">
            <div className="detection-info-item">
              <div className="info-label">Detected Pest</div>
              <div className="info-value detection-name">{currentDetection.name}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Confidence Level</div>
              <div className="info-value">{currentDetection.confidence}%</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Date</div>
              <div className="info-value">{currentDetection.date}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Time</div>
              <div className="info-value">{currentDetection.time}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">LED Repellent</div>
              <div className="info-value led-color-display">
                <span 
                  className="led-indicator-large" 
                  style={{ 
                    backgroundColor: getLEDColor(currentDetection.pattern).color,
                    color: getLEDColor(currentDetection.pattern).color 
                  }}
                ></span>
                {getLEDColor(currentDetection.pattern).name}
              </div>
            </div>
          </div>
        </div>
      ) : latestDetection ? (
        <div className="detection-previous">
          <div className="detection-status-badge status-clear">
            ✅ NO CURRENT THREATS
          </div>
          <div className="detection-info-grid">
            <div className="detection-info-item">
              <div className="info-label">Last Detected</div>
              <div className="info-value detection-name">{latestDetection.name}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Confidence</div>
              <div className="info-value">{latestDetection.confidence}%</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Date</div>
              <div className="info-value">{latestDetection.date}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">Time</div>
              <div className="info-value">{latestDetection.time}</div>
            </div>
            <div className="detection-info-item">
              <div className="info-label">LED Used</div>
              <div className="info-value led-color-display">
                <span 
                  className="led-indicator-large" 
                  style={{ 
                    backgroundColor: getLEDColor(latestDetection.pattern).color,
                    color: getLEDColor(latestDetection.pattern).color 
                  }}
                ></span>
                {getLEDColor(latestDetection.pattern).name}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="detection-empty">
          <div className="detection-status-badge status-monitoring">
            👁️ MONITORING
          </div>
          <div className="system-info">
            <p>The system is actively monitoring for pests.</p>
            <p>Alerts will appear when insects are detected.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectedInsectDisplay;

