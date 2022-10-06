import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import HeatMap from 'react-heatmap-grid';

import Chart from '../../model/chart';
import { ChartContext } from '../../context/chart-context';

type Props = {};

const Charts: React.FC<Props> = props => {
  const ctx = useContext(ChartContext);

  const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
      new Array(xLabels.length)
        .fill(0)
        .map(() => Math.floor(Math.random() * 100))
    );

  const credit: Chart[] | undefined = ctx?.charts.filter(
    item => item.transactionType === 'credit'
  );

  const debit: Chart[] | undefined = ctx?.charts.filter(
    item => item.transactionType === 'debit'
  );

  // prettier-ignore
  const sundayCredit = credit?.filter(item => new Date(item.date).getDay() === 0);

  const sundayDebit = debit?.filter(item => new Date(item.date).getDay() === 0);

  console.log(sundayCredit);
  console.log(sundayDebit);

  const reduceFunction = (total: number, value: number) => total + value;

  const sundayCreditSum: number | undefined = sundayCredit
    ?.map(item => item.amount)
    .reduce(reduceFunction);

  const sundayDebitSum: number | undefined = sundayDebit
    ?.map(item => item.amount)
    .reduce(reduceFunction);

  console.log(sundayCreditSum, sundayDebitSum);

  // const sundayTotalSum: number | undefined = sundayCreditSum + sundayDebititSum;

  // const col: [] = [];

  // const row: [] = [];

  // const carterdata: Array<[]> = [col, row];

  return (
    <>
      <motion.div>
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsLocation={'bottom'}
          xLabelWidth={60}
          data={data}
          squares
          height={45}
          onClick={(x: any, y: any) => alert(`Clicked ${x}, ${y}`)}
          cellStyle={(
            background: any,
            value: number,
            min: number,
            max: number,
            data: any,
            x: any,
            y: any
          ) => ({
            background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
            fontSize: '11.5px',
            color: '#444',
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
