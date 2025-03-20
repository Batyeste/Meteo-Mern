// src/components/common/Loader.jsx
import React from 'react';

export default function Loader () {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-gray-200 rounded-full border-t-primary animate-spin mb-4"></div>
      <p>Chargement en cours...</p>
    </div>
  );
};
