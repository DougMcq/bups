import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full mt-8">
      <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
