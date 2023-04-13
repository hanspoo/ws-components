import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from '@starter-ws/reductor';

export const decorators = [
  (Story, context) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];
