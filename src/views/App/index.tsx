import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
import Answers from '../Answers';
import Questions from '../Questions';

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route
          exact={true}
          path="/"
          component={Questions}
        />
        <Route
          path="/answers"
          component={Answers}
        />
      </Switch>
    );
  }
}

export default App;
