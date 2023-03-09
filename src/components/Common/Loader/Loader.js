import React from "react";
// import LogoIcon from "../../../../../assets/images/logo-icon.png";

const Loader = () => {
  return (
    <>
      <div className="loader">
        {/* <img src={LogoIcon} alt="" /> */}
        <svg
          className="progress-ring"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#ffffff1a"
            strokeWidth="5"
          />
          <circle
            className="progress-ring__value"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
        </svg>
      </div>
    </>
  );
};
export default Loader;
