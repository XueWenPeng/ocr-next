import React from 'react';
import { Tooltip } from 'mishu-ui';
import { QuestionCircleOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { renderBigNumber } from 'Utils/methods';
import { amountKeys, percentLKeys } from '../constants';
import '../index.less';

interface SingleChartProps {
  dataKey: string;
  title: string;
  content: number;
  pre: number;
  preType: string;
  tips?: string;
  trend?: 'up' | 'down';
}

const SingleChart = ({ title, content, pre, tips, trend, dataKey, preType }: SingleChartProps) => {
  const getpreText = (): string => {
    switch (preType) {
      case 'dayData':
        return '昨日';
      case 'weekData':
        return '上周';
      case 'monthData':
        return '上月';
      case 'threeMonthData':
        return '前三个月';
      case 'sixMonthData':
        return '前半年';
      default:
        return '-';
    }
  };

  const renderInfo = (value: number, isPre?: true): number | string => {
    let info: string | number = value;
    if (amountKeys.includes(dataKey)) info = renderBigNumber(value);
    if (percentLKeys.includes(dataKey)) info = `${(value * 100).toFixed(0)}%`;
    return isPre ? `${getpreText()}${info}` : info;
  };

  return (
    <div className='singlechart-box'>
      <span>
        {title}
        {!!tips && (
          <Tooltip title={tips}>
            <QuestionCircleOutlined className='ml-4 cursor-p' />
          </Tooltip>
        )}
      </span>
      <span className={`singlechart-content ${trend ? `singlechart-content-${trend}` : ''}`}>
        {trend === 'up' && <ArrowUpOutlined />}
        {trend === 'down' && <ArrowDownOutlined />}
        {content === -1 ? '-' : renderInfo(content)}
      </span>
      <span>{pre === -1 ? '-' : renderInfo(pre, true)}</span>
    </div>
  );
};

export default SingleChart;
