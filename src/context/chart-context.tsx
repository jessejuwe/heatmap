import React, { useState, useEffect } from 'react';
import Chart from '../model/chart';
import customData from '../data/transactions.json'; // importing the .json file

interface ChartContextObj {
  charts: Chart[];
}

export const ChartContext = React.createContext<ChartContextObj | null>({
  charts: [],
});

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = props => {
  const [charts, setCharts] = useState<Chart[]>([]);

  useEffect(() => {
    // Data Transformation Logic
    const data: Array<Chart> = customData.map(data => ({
      transactionType: data.transactionType,
      date: data.date,
      amount: data.amount,
    }));

    setCharts(data);

    return () => {};
  }, []);

  const contextValue: ChartContextObj = {
    charts,
  };

  return (
    <ChartContext.Provider value={contextValue}>
      {props.children}
    </ChartContext.Provider>
  );
};

export default ContextProvider;
