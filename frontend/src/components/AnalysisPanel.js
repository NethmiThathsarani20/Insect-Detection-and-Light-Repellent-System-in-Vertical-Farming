import React from 'react';
import { FaChartLine } from 'react-icons/fa';

const AnalysisPanel = ({ detectedPest, activePattern }) => {
  const getPatternInfo = (pattern) => {
    switch (pattern) {
      case 1:
        return {
          name: 'Growth Mode',
          desc: 'Spectrum: Purple (Photosynthesis Opt.)',
          state: 'state-safe'
        };
      case 2:
        return {
          name: 'Repellent Mode',
          desc: 'Spectrum: Blue (Aphid/Mite Control)',
          state: 'state-blue'
        };
      case 4:
        return {
          name: 'Visual Masking',
          desc: 'Spectrum: Red (Thrips/Whitefly Disruption)',
          state: 'state-red'
        };
      default:
        return {
          name: 'Growth Mode',
          desc: 'Spectrum: Purple (Red+Blue)',
          state: 'state-safe'
        };
    }
  };

  const patternInfo = getPatternInfo(activePattern);

  return (
    <div className="card">
      <div className="card-header">
        <FaChartLine /> Real-time Analysis
      </div>

      <div className={`metric-box ${detectedPest !== 'None' ? 'state-red' : ''}`}>
        <div className="metric-label">Detected Species</div>
        <div className="metric-value">
          {detectedPest === 'None' ? 'No Threats' : detectedPest}
        </div>
      </div>

      <div className={`metric-box ${patternInfo.state}`}>
        <div className="metric-label">Active Countermeasure</div>
        <div className="metric-value">{patternInfo.name}</div>
        <div className="metric-desc">{patternInfo.desc}</div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
