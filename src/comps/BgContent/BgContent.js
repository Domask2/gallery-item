import React from 'react';
import Loader from './Loader';

const BgContent = () => {
  return (
    <div>
      <Loader />
      <div className="content-bg"></div>
      <div className="overlay-bg"></div>
    </div>
  );
};

export default BgContent;
