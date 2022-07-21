import { IndexData, IndexDataRecord } from './services';

interface SingleChartConfigType {
  title: string;
  tips: string;
  dataKey: keyof IndexData;
  hasTrend: boolean;
}

export const singleChartConfig: SingleChartConfigType[] = [
  {
    title: '新增案件',
    tips: '新添加案件数量',
    dataKey: 'newAddCase',
    hasTrend: true,
  },
  {
    title: '完成案件',
    tips: '已核对并理算完成案件数量',
    dataKey: 'completeCase',
    hasTrend: true,
  },
  {
    title: '索赔总金额',
    tips: '案件医疗票据索赔金额汇总',
    dataKey: 'allCost',
    hasTrend: false,
  },
  {
    title: '扣减总金额',
    tips: '案件医疗票据扣减金额汇总',
    dataKey: 'actualAmount',
    hasTrend: false,
  },
  {
    title: '平台扣减率',
    tips: '扣减总金额/索赔总金额',
    dataKey: 'amountRate',
    hasTrend: true,
  },
  {
    title: '均件赔付金额',
    tips: '平均每个案件的赔付金额（赔付总金额 /完成案件数）',
    dataKey: 'averageCost',
    hasTrend: false,
  },
];

export const amountKeys: string[] = ['allCost', 'actualAmount', 'averageCost'];

export const percentLKeys: string[] = ['amountRate'];

export type DisplayDataKeysType = 'day' | 'week' | 'month' | 'threeMonth' | 'sixMonth';

interface DisplayDataConfigType {
  title: string;
  key: DisplayDataKeysType;
}

export const displaySingleConfig: DisplayDataConfigType[] = [
  {
    title: '今日',
    key: 'day',
  },
  {
    title: '7天',
    key: 'week',
  },
  {
    title: '30天',
    key: 'month',
  },
  {
    title: '90天',
    key: 'threeMonth',
  },
  {
    title: '180天',
    key: 'sixMonth',
  },
];

export const displayLineConfig: DisplayDataConfigType[] = [
  {
    title: '30天',
    key: 'month',
  },
  {
    title: '90天',
    key: 'threeMonth',
  },
  {
    title: '180天',
    key: 'sixMonth',
  },
];

export const displayDataKeys: Record<DisplayDataKeysType, [keyof IndexDataRecord, keyof IndexDataRecord]> = {
  day: ['dayData', 'preDayData'],
  week: ['weekData', 'preWeekData'],
  month: ['monthData', 'preMonthData'],
  threeMonth: ['threeMonthData', 'preThreeMonthData'],
  sixMonth: ['sixMonthData', 'preSixMonthData'],
};
