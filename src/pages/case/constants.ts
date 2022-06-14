import { SearchConfig } from 'mishu-ui/es/busnessComponents/tableSearch/typing';
import { userInfo } from 'Utils/constants';

export const permissions: string[] = userInfo.permissions || [];
export const AUTH_CASE_SELECT_ALL = permissions.includes('auth/case/select/all');

export const columns = [
  { title: '案件类型', dataIndex: 'caseTypeName', key: 'caseTypeName', width: 85 },
  { title: '被保险人', dataIndex: 'insurant', key: 'insurant', width: 100 },
  { title: '理赔人员', dataIndex: 'uploadUserName', key: 'uploadUserName', width: 100 },
  { title: '上传时间', dataIndex: 'createTime', key: 'createTime', width: 85 },
  {
    title: '最终赔付金额',
    dataIndex: 'totalSettlementAmount',
    key: 'totalSettlementAmount',
    width: 85,
    render: (text: string, record: Record<string, any>) => {
      console.log(text);
      // 【1】首先筛选已处理
      const caseDetailListFilter = record.caseDetailList.filter((t: Record<string, any>) => !!t.status);
      // 【2】计算所有已处理的值
      return caseDetailListFilter
        .reduce(
          (totalSum: number, value: Record<string, any>) =>
            totalSum + (value.settlementAmount ? value.settlementAmount : 0),
          0,
        )
        .toFixed(2);
    },
  },
];

export const tableSearchConfig: SearchConfig[] = [
  {
    type: 'input',
    label: '报案号',
    name: 'caseNum',
  },
  {
    type: 'input',
    label: '被保险人',
    name: 'insurant',
  },
  {
    type: 'input',
    label: '伤者姓名',
    name: 'injureName',
  },
  {
    type: 'select',
    label: '理赔人员',
    name: 'qUploadUser',
    options: [],
  },
];

export const getListCaseStatus = (pathname: string): number => {
  switch (pathname) {
    case '/app/case/case':
      return 1;
    case '/app/case/casedid':
      return 2;
    case '/app/case/caseback':
      return -1;
    default:
      return 1;
  }
};
