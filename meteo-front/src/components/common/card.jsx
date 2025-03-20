import React from 'react';

export default function Card ({ title, children, className = '' })  {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${className}`}>
      {title && <div className="p-4 bg-primary font-bold text-lg">{title}</div>}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

