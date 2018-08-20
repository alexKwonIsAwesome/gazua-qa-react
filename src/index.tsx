import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './global-styles';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
