import React, { Component } from 'react';
import LinkList from './Components/LinkList.js';
import CreateLink from './Components/CreateLink';
import Header from './Components/Header';
import Login from './Components/Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import Search from './Components/Search.js';
import { removeDirectivesFromDocument } from 'apollo-utilities';

class App extends Component {
  render() {
    return (
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/new/1' />} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/top' component={LinkList} />
            <Route exact path='/new/:page' component={LinkList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;