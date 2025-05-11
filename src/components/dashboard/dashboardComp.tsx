import React from 'react'
import Analysis from '../Analysis/Analysis';
import Services from '../Analysis/Services';
import Report from './reports/Report';

const DashboardComp:React.FC = () => {
  return (
    <>
      <Report/>
      <Analysis/>
      <Services/>
    </>
  );
};
export default DashboardComp;