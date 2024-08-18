import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-white border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
