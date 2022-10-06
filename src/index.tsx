import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ChartProvider from './context/chart-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChartProvider>
    <App />
  </ChartProvider>
);
