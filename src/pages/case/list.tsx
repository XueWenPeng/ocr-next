import React, { useEffect, useMemo } from 'react';
import { TableSearch } from 'mishu-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { tableSearchConfig, getListCaseStatus } from './constants';
import CaseTable from './components/caseTable';

const CaseList = () => {
  const navigator = useNavigate();
  const { pathname } = useLocation();
  const listCaseStatus = useMemo<number>(() => getListCaseStatus(pathname), [pathname]);

  useEffect(() => {
    console.log(listCaseStatus);
    return () => console.log(navigator);
  }, []);

  return (
    <>
      <TableSearch
        config={tableSearchConfig}
        onSearch={() => console.log('search')}
        onReset={() => console.log('reset')}
        defaultOpen
      />
      {/* <CaseTable /> */}
    </>
  );
};

export default CaseList;
