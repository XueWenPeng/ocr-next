import Request from 'Src/request';

export interface IndexData {
  actualAmount: number;
  allCost: number;
  amountRate: number;
  averageCost: number;
  completeCase: number;
  newAddCase: number;
  payCost: number;
}

export interface IndexDataList {
  actualAmountList: number[];
  allCostList: number[];
  amountRateList: number[];
  averageCostList: number[];
  completeCaseList: number[];
  newAddCaseList: number[];
  date: string[];
}

export interface IndexDataRecord {
  dayData: IndexData;
  monthData: IndexData;
  preDayData: IndexData;
  preMonthData: IndexData;
  preSixMonthData: IndexData;
  preThreeMonthData: IndexData;
  preWeekData: IndexData;
  sixMonthData: IndexData;
  threeMonthData: IndexData;
  weekData: IndexData;
}

export type IndexDataRes = IndexDataList & IndexDataRecord;

export const getIndexDataAllApi = () =>
  Request<null, IndexDataRes>({
    url: '/api/case/index/data/all',
    method: 'GET',
    params: null,
  });

export const getIndexDataApi = () =>
  Request<null, IndexDataRes>({
    url: '/api/case/index/data',
    method: 'GET',
    params: null,
  });
