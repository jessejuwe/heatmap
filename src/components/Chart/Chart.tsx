import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import HeatMap from 'react-heatmap-grid';

import Chart from '../../model/chart';
import { ChartContext } from '../../context/chart-context';

type Props = {};

const Charts: React.FC<Props> = props => {
  const ctx = useContext(ChartContext);

  // data processing function for reducing the transaction amounts down to a sum
  const sumTransaction = (data: Chart[], month: number) => {
    // Filtering for 'credit' transactionType
    const credit: Chart[] | undefined = data.filter(
      item => item.transactionType === 'credit'
    );

    // Filtering for 'debit' transactionType
    const debit: Chart[] | undefined = data.filter(
      item => item.transactionType === 'debit'
    );

    // Filtering for a particular 'month' credit transactions across all years
    const credit_for_monthX = credit?.filter(
      item => new Date(item.date).getMonth() === month
    );

    // Filtering for a particular 'month' debit transactions across all years
    const debit_for_monthX = debit?.filter(
      item => new Date(item.date).getMonth() === month
    );

    // creating a reduce callback function to be used in Array.reduce()
    const reduceFunction = (total: number, value: number) => total + value;

    // function for calculating credit for the days of the month
    const calcDay_credit = () => {
      const data: number[] = []; // will contain reduced transaction value for each day

      for (let i = 0; i <= 6; i++) {
        // Filtering for a particular 'day of week' credit transactions across all years
        const credit_for_dayX = credit_for_monthX?.filter(
          item => new Date(item.date).getDay() === i
        );

        const dayXCreditSum: number = credit_for_dayX
          ?.map(item => item.amount)
          .reduce(reduceFunction, 0) as number; // type assertion

        data.push(Math.round(dayXCreditSum));
      }

      return data;
    };

    // function for calculating debit for the days of the month
    const calcDay_debit = () => {
      const data: number[] = []; // will contain reduced transaction value for each day

      for (let i = 0; i <= 6; i++) {
        // Filtering for a particular 'day of week' debit transactions across all years
        const debit_for_dayX = debit_for_monthX?.filter(
          item => new Date(item.date).getDay() === i
        );

        const dayXDebitSum: number = debit_for_dayX
          ?.map(item => item.amount)
          .reduce(reduceFunction, 0) as number; // type assertion

        data.push(Math.round(dayXDebitSum));
      }

      return data;
    };

    const creditValues = calcDay_credit(); // [sun, mon, tue, wed, thu, fri, sat]
    const debitValues = calcDay_debit(); // [sun, mon, tue, wed, thu, fri, sat]

    // prettier-ignore
    const daysNetValue = creditValues.map((value, index) => value + debitValues[index]);

    return daysNetValue; // array of net value of each day in the month
  };

  const transactions: Array<number[]> = [];

  for (let i = 0; i <= 11; i++) {
    const value = sumTransaction(ctx?.charts as Chart[], i);

    transactions.push(value);
  }

  console.log(transactions);
  console.table(transactions);

  // prettier-ignore
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );

  // convert array to matrix
  const listToMatrix = (list: any, elementsPerSubArray: number) => {
    // prettier-ignore
    let matrix:any = [], i: number, k: number;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  };

  const transformedData = listToMatrix(transactions, 7);

  console.log(transformedData);

  return (
    <>
      <motion.div className="chart app__flex">
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsLocation={'bottom'}
          xLabelWidth={900}
          data={data}
          squares
          height={65}
          onClick={(x: any, y: any) => alert(`Clicked ${x}, ${y}`)}
          unit="Naira"
          cellStyle={(
            background: any,
            value: number,
            min: number,
            max: number,
            data: any,
            x: any,
            y: any
          ) => ({
            background: `rgb(0, 128, 128, ${1 - (max - value) / (max - min)})`,
            fontSize: '1rem',
            color: '#fff',
          })}
          cellRender={(
            value:
              | string
              | number
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | React.ReactFragment
              | React.ReactPortal
              | null
              | undefined
          ) => value && <div>{value}</div>}
        />
      </motion.div>
    </>
  );
};

export default Charts;
