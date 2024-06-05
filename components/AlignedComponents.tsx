// components/AlignedComponents.tsx
import React from 'react';

const AlignedComponents: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <div className="text-lg font-bold">Left Component</div>
      <div className="text-lg font-bold">Right Component</div>
    </div>
  );
};

export default AlignedComponents;
