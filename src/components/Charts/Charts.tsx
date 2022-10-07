import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import HeatMap from 'react-heatmap-grid';

import Chart from '../../model/model';
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

        // mapping thru the days of the week, and reducing the values to one
        const dayXCreditSum: number = credit_for_dayX
          ?.map(item => item.amount)
          .reduce(reduceFunction, 0) as number; // type assertion

        data.push(Math.round(dayXCreditSum)); // adding each reduced value to an array
      }

      return data;
    };

    // function for calculating debit for the days of the month
    const calcDay_debit = () => {
      const data: number[] = []; // will contain reduced transaction value for each day

      // iterates 7 times (representing each day in a week)
      for (let i = 0; i <= 6; i++) {
        // Filtering for a particular 'day of week' debit transactions across all years
        const debit_for_dayX = debit_for_monthX?.filter(
          item => new Date(item.date).getDay() === i
        );

        // mapping thru the days of the week, and reducing the values to one
        const dayXDebitSum: number = debit_for_dayX
          ?.map(item => item.amount)
          .reduce(reduceFunction, 0) as number; // type assertion

        data.push(Math.round(dayXDebitSum)); // adding each reduced value for each day, to an array
      }

      return data;
    };

    const creditValues = calcDay_credit(); // [sun, mon, tue, wed, thu, fri, sat]
    const debitValues = calcDay_debit(); // [sun, mon, tue, wed, thu, fri, sat]

    // prettier-ignore
    const daysNetValue = creditValues.map((value, index) => value + debitValues[index]);

    return daysNetValue; // array of net value of each day in the month
  };

  const transactions: Array<number[]> = []; // shape of the output

  // iterates 12 times (representing each month in a year)
  for (let i = 0; i <= 11; i++) {
    const value = sumTransaction(ctx?.charts as Chart[], i);

    transactions.push(value); // adding each reduced value for each month, to an array
  }

  // transposing the array (changing the shape of the array)
  const transposedData = transactions[0].map((_, colIndex) =>
    transactions.map(row => row[colIndex])
  );

  // prettier-ignore
  const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <motion.div
        className="chart app__flex"
        whileInView={{ y: [-100, 0], opacity: [0, 1] }}
        exit={{ x: [0, 20], opacity: [1, 0] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
      >
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsLocation={'bottom'}
          xLabelWidth={900}
          data={transposedData}
          squares
          height={65}
          onClick={(x: any, y: any) => alert(`Clicked ${x}, ${y}`)}
          unit="Dollars"
          // prettier-ignore
          cellStyle={(background: any, value: number, min: number, max: number) => ({
            background:
              value > max - value
                ? `rgb(0, 255, 0, ${1 - (max - value) / (max - min)})`
                : `rgb(255, 0, 0, ${(max - value) / (max - min)})`,
            fontSize: '1rem',
            color: '#fff',
          })}
          cellRender={(value: any) => value && <div>{value}</div>}
        />
        <p className="p-text red-text">
          The <span>redder</span> the cell, the higher the <span>negative</span>{' '}
          accumulated transaction
        </p>
        <p className="p-text green-text">
          The <span>greener</span> the cell, the higher the{' '}
          <span>positive</span> accumulated transaction
        </p>
      </motion.div>
    </>
  );
};

export default Charts;
