import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './global-styles';
import registerServiceWorker from './registerServiceWorker';
import App from './views/App';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
