import React, { useState } from 'react';
import notFoundImage from 'Assets/images/notFound.png';
import './index.less';

const NotFound = () => {
  const [animated, setAnimated] = useState<string>('');

  const handleAnimated = (): void => {
    if (animated) return;
    setAnimated('hinge');
  };

  return (
    <div className='notfound-box flex-center'>
      <img src={notFoundImage} alt='404' className={`notfound-animate ${animated}`} onMouseEnter={handleAnimated} />
    </div>
  );
};

export default NotFound;
