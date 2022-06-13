import React, { ReactNode } from 'react';
import './index.less';

interface ContetntTitleProps {
  title: string;
  extra?: ReactNode;
}

const ContetntTitle = ({ title, extra = null }: ContetntTitleProps) => {
  const keys = title.split('/');
  return (
    <div className='content-header-box'>
      <div className='content-header-box-title'>
        {keys.map((item, index) => (
          <span key={item}>{`${item}${index === keys.length - 1 ? '' : '/'}`}</span>
        ))}
      </div>
      {extra}
    </div>
  );
};

export default ContetntTitle;
