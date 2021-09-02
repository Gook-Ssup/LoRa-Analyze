import React from "react";
import PageContainer from "shared/PageContainer";

// local
import LineChart from "./LineChart";
import ScatterChart from "./ScatterChart";


const Analyze = () => {
  return <PageContainer>
      <LineChart></LineChart>
      <ScatterChart></ScatterChart>
  </PageContainer>;
};

export default Analyze;
