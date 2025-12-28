import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

// Components
import Navbar from './components/Navbar';
import DetectedInsectDisplay from './components/VideoFeed';
import SourceSelector from './components/SourceSelector';
import AnalysisPanel from './components/AnalysisPanel';
import Timer from './components/Timer';
import AlertNotification from './components/AlertNotification';
import DetectionHistory from './components/DetectionHistory';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [systemStatus, setSystemStatus] = useState(true);
  const [currentSource, setCurrentSource] = useState('esp32');
  const [detectedPest, setDetectedPest] = useState('None');
  const [activePattern, setActivePattern] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [alerts, setAlerts] = useState([]);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [lastDetection, setLastDetection] = useState(null);
  const [currentDetection, setCurrentDetection] = useState(null);

  // Fetch status from backend
  const fetchStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get_status`);
      const data = response.data;

      setDetectedPest(data.pest);
      setActivePattern(data.pattern);
      setIsActive(data.active);
      setRemainingTime(data.remaining_time);
      setCurrentSource(data.source);
      setSystemStatus(true);

      // Detect new insect and create alert
      if (data.pest !== 'None' && data.pest !== lastDetection) {
        const now = new Date();
        const detection = {
          name: data.pest,
          confidence: data.confidence || 90, // Use backend confidence or default to 90%
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          pattern: data.pattern,
          timestamp: now.getTime()
        };

        setLastDetection(data.pest);
        setCurrentDetection(detection);
        setAlerts(prev => [...prev, detection]);
        setDetectionHistory(prev => [detection, ...prev].slice(0, 10)); // Keep last 10
      } else if (data.pest === 'None') {
        if (lastDetection !== null) {
          setLastDetection(null);
        }
        setCurrentDetection(null);
      } else if (data.pest !== 'None' && currentDetection === null) {
        // Recreate current detection if page was refreshed
        const now = new Date();
        const detection = {
          name: data.pest,
          confidence: data.confidence || 90,
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          pattern: data.pattern,
          timestamp: now.getTime()
        };
        setCurrentDetection(detection);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
      setSystemStatus(false);
    }
  }, [lastDetection, currentDetection]);

  // Switch video source
  const handleSourceChange = async (source) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/switch_source/${source}`);
      if (response.data.status === 'success') {
        setCurrentSource(source);
      } else {
        console.error('Error switching source:', response.data.message);
        alert(`Failed to switch to ${source}: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error switching source:', error);
      alert(`Failed to switch to ${source}. Please check if the ${source} is available.`);
    }
  };

  // Remove alert
  const handleCloseAlert = (index) => {
    setAlerts(prev => prev.filter((_, i) => i !== index));
  };

  // Poll backend every 500ms
  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 500);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <div className="app">
      <Navbar systemStatus={systemStatus} />

      {/* Alert Notifications */}
      <div className="alert-container">
        {alerts.map((alert, index) => (
          <AlertNotification
            key={alert.timestamp}
            detection={alert}
            onClose={() => handleCloseAlert(index)}
          />
        ))}
      </div>

      <div className="container">
        {/* Left Column - Detection Display */}
        <div>
          <DetectedInsectDisplay
            detection={currentDetection}
            detectionHistory={detectionHistory}
          />
        </div>

        {/* Right Column - Controls */}
        <div className="control-panel">
          <SourceSelector
            currentSource={currentSource}
            onSourceChange={handleSourceChange}
          />
          <AnalysisPanel
            detectedPest={detectedPest}
            activePattern={activePattern}
          />
          <Timer isActive={isActive} remainingTime={remainingTime} />
          <DetectionHistory detections={detectionHistory} />
        </div>
      </div>

      <div className="footer">
        &copy; 2025 Undergraduate Research Project | Faculty of Engineering Technology
      </div>
    </div>
  );
}

export default App;

