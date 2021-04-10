import React, { useEffect } from 'react';

const ProgressBar = ({ percent, setPercent, url }) => {

  useEffect(() => {
    if (url) {
      setPercent(0);
    }
  }, [url, setPercent]);
  console.log(percent)
  return (
    <div className="progress-bar" style= {{width: percent + '%'}}>
      dfdsfdgdfg
    </div>
  );
}

export default ProgressBar;
