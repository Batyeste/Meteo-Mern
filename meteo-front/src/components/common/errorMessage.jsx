// src/components/common/ErrorMessage.jsx
import React from 'react';

export default function ErrorMessage ({ message }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
      <p>{message || "Une erreur s'est produite."}</p>
    </div>
  );
};

