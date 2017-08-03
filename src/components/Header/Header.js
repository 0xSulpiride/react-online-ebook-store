import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'home'
    }
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  setCurrentPage(e, {name}) {
    this.setState({
      currentPage: name
    });
  }

  render() {
    const {currentPage} = this.state;
    return (
      <Menu stackable>
        <Menu.Item
          as={Link}
          name="home"
          onClick={this.setCurrentPage}
          to="/"
        >
          <img src='https://react.semantic-ui.com/logo.png' alt="logo"/>
        </Menu.Item>
        <Menu.Item
          as={Link}
          name="home"
          active={currentPage === 'home'}
          onClick={this.setCurrentPage}
          to="/"
        >
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/cart"
          name="cart"
          active={currentPage === 'cart'}
          onClick={this.setCurrentPage}
        >
          Cart
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/cash-desk"
          name="cash-desk"
          active={currentPage === 'cash-desk'}
          onClick={this.setCurrentPage}
        >
          Cash Desk
        </Menu.Item>
      </Menu>
    )
  }
}

export default Header;