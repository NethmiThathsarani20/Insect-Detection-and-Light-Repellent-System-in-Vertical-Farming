import React from 'react';

const VideoFeed = ({ videoSource, currentSource }) => {
  return (
    <div className="video-section">
      <div className="video-wrapper">
        <div className="live-indicator">
          <div className="blink"></div>
          LIVE FEED
        </div>
        <img 
          src={videoSource} 
          alt="Camera Feed"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Db25uZWN0aW5nIHRvIGNhbWVyYS4uLjwvdGV4dD48L3N2Zz4=';
          }}
        />
      </div>
      <div className="video-info">
        <span>
          Input Source: <strong>{currentSource === 'esp32' ? 'ESP32-CAM' : 'Webcam'}</strong>
        </span>
        <span>
          Resolution: <strong>640x480</strong>
        </span>
      </div>
    </div>
  );
};

export default VideoFeed;
