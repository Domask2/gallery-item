import React, { useEffect, useState } from "react";

const Loader = () => {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <div className={loader ? "loader-wrapper" : "none"}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
