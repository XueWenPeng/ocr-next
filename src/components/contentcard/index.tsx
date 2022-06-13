import React, { ReactNode } from 'react';
import './index.less';

const ContentCard = ({ children }: { children: ReactNode }) => {
  return <div className='content-box'>{children}</div>;
};

export default ContentCard;
