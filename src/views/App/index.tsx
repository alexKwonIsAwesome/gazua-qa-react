import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom'
import Answers from '../Answers';
import Questions from '../Questions';
import QuestionInstance from '../QuestionInstance';
import Auth from '../Auth';

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
        <Route
          path="/question/:id"
          component={QuestionInstance}
        />
        <Route
          path="/auth"
          component={Auth}
        />
      </Switch>
    );
  }
}

export default App;
