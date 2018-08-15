import * as React from 'react';
import {
  Route,
} from 'react-router-dom'

const Comp = () => <div>Hello!</div>

class App extends React.Component {
  public render() {
    return (
      <div>
        <Route
          exact={true}
          path="/"
          component={Comp}
        />
      </div>
    );
  }
}

export default App;
