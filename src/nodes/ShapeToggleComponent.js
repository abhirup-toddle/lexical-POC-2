import './ShapeToggle.css';

import React, {useState} from 'react';

const ShapeToggle = () => {
  const [isSquare, setIsSquare] = useState(true);

  const handleClick = () => {
    setIsSquare(!isSquare);
  };

  return (
    <div
      className={isSquare ? 'square-shapeStyle' : 'circle-shapeStyle'}
      onClick={handleClick}
    />
  );
};

export default ShapeToggle;
