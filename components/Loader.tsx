import React from "react";
import LoadingIcon from "./icons/LoadingIcon";

const Loader: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <div className="animate-spin h-24 w-24">
        <LoadingIcon />
      </div>
    </div>
  );
};

export default Loader;
