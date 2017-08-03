import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth';

class Header extends Component {
  constructor() {
    super();
    this.renderLoginRegister = this.renderLoginRegister.bind(this);
  }
  renderLoginRegister(currentPage) {
    if (!this.props.authenticated) {
      return <Menu.Menu position='right'>
        <Menu.Item
          as={Link}
          to="/login"
          name="/login"
          active={currentPage === '/login'}
        >
          Login
          </Menu.Item>
        <Menu.Item
          as={Link}
          to="/signup"
          name="/signup"
          active={currentPage === '/signup'}
        >
          Sign Up
          </Menu.Item>
      </Menu.Menu>
    } else {
      return <Menu.Menu position='right'>
        <Menu.Item
          as={Link}
          to="/logout"
          onClick={() => this.props.logout()}
        >
          Logout
        </Menu.Item>
      </Menu.Menu>
    }
  }
  render() {
    const currentPage = this.props.location;
    return (
      <Menu stackable>
        <Menu.Item
          as={Link}
          name="/"
          to="/"
        >
          <img src='https://react.semantic-ui.com/logo.png' alt="logo" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="/"
          active={currentPage === '/'}
          to="/"
        >
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/cart"
          name="/cart"
          active={currentPage === '/cart'}
        >
          Cart
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/cash-desk"
          name="/cash-desk"
          active={currentPage === '/cash-desk'}
        >
          Cash Desk
        </Menu.Item>
        {this.renderLoginRegister(currentPage)}
      </Menu>
    )
  }
}

function mapState(state) {
  return {
    location: state.router.location.pathname,
    authenticated: state.auth.authenticated
  }
}

function mapDispatch(dispatch) {
  return {
    logout: bindActionCreators(authActions.logout, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Header);