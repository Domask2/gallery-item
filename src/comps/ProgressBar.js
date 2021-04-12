import React, { useEffect } from 'react';

const ProgressBar = ({ percent, setPercent, url }) => {
  useEffect(() => {
    if (url) {
      setPercent(0);
    }
  }, [url, setPercent]);
  return <div className="progress-bar" style={{ width: percent + '%' }}></div>;
};

export default ProgressBar;
