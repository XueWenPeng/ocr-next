import React, { useEffect, useState } from 'react';
import { Tabs, Spin, Divider, Radio } from 'mishu-ui';
import { getUserInfo } from 'Utils/methods';
import { AUTH_CASE_SELECT_ALL } from 'Utils/constants';
import SingleChart from './components/singleChart';
import {
  singleChartConfig,
  displaySingleConfig,
  displayDataKeys,
  DisplayDataKeysType,
  displayLineConfig,
} from './constants';
import { getIndexDataAllApi, getIndexDataApi, IndexDataRes, IndexDataRecord, IndexData } from './services';

const userInfo = getUserInfo();

const Home = () => {
  const [tabKey, setTabKey] = useState<string>('base');
  const [loading, setLoading] = useState<boolean>(false);
  const [indexData, setIndexData] = useState<IndexDataRes | null>(null);
  const [currentSingleKeys, setCurrentSingleKeys] = useState<[keyof IndexDataRecord, keyof IndexDataRecord]>([
    'monthData',
    'preMonthData',
  ]);
  const [currentLineKeys, setCurrentLineKeys] = useState<[string, string]>(['monthData', 'preMonthData']);

  const getSingleChartTrend = (dataKey: keyof IndexData, hasTrend: boolean): 'up' | 'down' | undefined => {
    if (indexData && hasTrend) {
      const current: number = indexData[currentSingleKeys[0]][dataKey];
      const pre: number = indexData[currentSingleKeys[1]][dataKey];
      return current - pre > 0 ? 'up' : 'down';
    }
    return undefined;
  };

  const getIndexData = async () => {
    setLoading(true);
    let res = null;
    res = await (userInfo.permissions?.includes(AUTH_CASE_SELECT_ALL) ? getIndexDataAllApi() : getIndexDataApi());
    if (res) setIndexData(res);
    setLoading(false);
  };

  const changeDisplayData = (value: DisplayDataKeysType, type: 'line' | 'single') => {
    switch (type) {
      case 'line':
        setCurrentLineKeys(displayDataKeys[value]);
        break;
      case 'single':
        setCurrentSingleKeys(displayDataKeys[value]);
        break;
      default:
    }
  };

  useEffect(() => {
    getIndexData();
  }, []);

  return (
    <Spin spinning={loading}>
      <Tabs type='card' activeKey={tabKey} onChange={setTabKey}>
        <Tabs.TabPane key='base' tab='基础指标'>
          <div className='flex-between mb-16'>
            <div className='home-chart-title'>指标</div>
            <Radio.Group onChange={(e) => changeDisplayData(e.target.value, 'single')} defaultValue='month'>
              {displaySingleConfig.map(({ title, key }) => (
                <Radio.Button key={key} value={key}>
                  {title}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
          <div className='flex-between'>
            {singleChartConfig.map(({ title, tips, dataKey, hasTrend }) => {
              return (
                <SingleChart
                  key={title}
                  title={title}
                  content={indexData ? indexData[currentSingleKeys[0]][dataKey] : -1}
                  dataKey={dataKey}
                  pre={indexData ? indexData[currentSingleKeys[1]][dataKey] : -1}
                  preType={currentSingleKeys[0]}
                  trend={getSingleChartTrend(dataKey, hasTrend)}
                  tips={tips}
                />
              );
            })}
          </div>
          <Divider />
          <div className='flex-between mb-16'>
            <div className='home-chart-title'>对比图</div>
            <Radio.Group onChange={(e) => changeDisplayData(e.target.value, 'line')} defaultValue='month'>
              {displayLineConfig.map(({ title, key }) => (
                <Radio.Button key={key} value={key}>
                  {title}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key='quality' tab='质量管理'>
          质量管理
        </Tabs.TabPane>
      </Tabs>
    </Spin>
  );
};
export default Home;
