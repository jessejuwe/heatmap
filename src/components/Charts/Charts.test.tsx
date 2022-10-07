import { shallow } from 'enzyme';

import Charts from './Charts';

// Testing Suite
describe('<Chart />', () => {
  // test
  test('Component renders without error', () => {
    // prettier-ignore
    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const heatMap = shallow(<Charts />);
    expect(heatMap.find(xLabels)).toHaveLength(12);
    expect(heatMap.find(yLabels)).toHaveLength(7);
  });
});
