import React, { Component, Suspense } from 'react';
import AppRouter from './component/RouterComponent';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      <AppRouter store={this.props.store}/>
      {console.log(this.props.store.getState().dashboard,"store==============")}
    </div>
    )
  }

}
export default App;
{/*
function App() {
  return(
    <div>
      <AppRouter />
    </div>
  );
}

export default App; */}
