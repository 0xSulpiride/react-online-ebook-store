import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => (
  <nav id="header">
      <NavLink exact activeClassName="active" to="/">Home</NavLink>
      <NavLink activeClassName="active" to="/cart">Cart</NavLink>
      <NavLink activeClassName="active" to="/cash-desk">Cash Desk</NavLink>
  </nav>
)

export default Header;