import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from '../Cart';
import CashDesk from '../CashDesk';
import Header from '../Header';
import Book from '../Book';
import Login from '../Login';
import SignUp from '../SignUp';
import Main from '../Main';
import 'semantic-ui-css/semantic.min.css';

const PrivateRoute = ({component: Component, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  );
};


const PublicRoute = ({component: Component, authenticated, ...props}) => {
  return (
    <Route
      {...props}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/' />}
    />
  );
};

class App extends Component {
  render() {
    const { authenticated} = this.props;
    return (
      <div>
        <Header />
        <div id="body">
          <Route exact path="/" component={Main} />
          <Route path="/cart" component={Cart} />
          <Route path="/cash-desk" component={CashDesk} />
          <Route path="/book/:isbn" render={({match}) => <Book isbn={match.params.isbn} />} />
          <PublicRoute authenticated={authenticated} path="/login" component={Login} />
          <PublicRoute authenticated={authenticated} path="/signup" component={SignUp} />
          <PrivateRoute authenticated={authenticated} path="/logout" />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default withRouter(connect(mapState)(App));