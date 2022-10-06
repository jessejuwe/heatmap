import Chart from './components/Chart/Chart';

type Props = {};

const App = (props: Props) => {
  return (
    <>
      <h1 className="head-text app__flex p-4">
        Financial Transactions HeatMap Chart
      </h1>
      <Chart />
    </>
  );
};

export default App;
