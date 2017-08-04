import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Select, Divider, Modal, Header } from 'semantic-ui-react'
import { countryOptions, cardOptions, monthOptions } from './options';

const ModalOrder = ({total}) => (
  <Modal trigger={<Button
    color='teal'
    content='Order'
    icon='shop'
    label={{ basic: true, color: 'teal', pointing: 'left', content: `$${total}` }} />} basic size='small'>
    <Header icon='envelope' content='We have a problem' />
    <Modal.Content>
      <p>Sorry, unfortunately this feature isn't available in your country. Due to the unstable economic and geopolitical situation, in particular, relations between East and West and ambigious terms in Europe and other parts of the World, we can no longer serve customers from several countries. In fact, we currently are negotiating with your country's highest authorities to fix this issue. We request you to bring the above information to your attention, and to take it into account in your future activities in connection with the discussion of this problem in the United Nations.</p>
    </Modal.Content>
  </Modal>
)

class CashDesk extends Component {
  render() {
    let message = null;
    if (!this.props.authenticated) {
      message = 'You have to sign in';
    }
    if (this.props.cartIsEmpty) {
      message = 'Your cart is empty';
    }
    return (
      <div id="cash-desk">
        {message ? <div><h1>{message}</h1></div> : null}
        <Form loading={message ? true : null}>
          <Divider horizontal><h4>Shipping Information</h4></Divider>
          <Form.Group>
            <Form.Input label='First Name' placeholder='First name' width={8} />
            <Form.Input label='Last Name' placeholder='Last name' width={8} />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Billing Adress' placeholder='Street Address' width={8} />
            <Form.Input label='Apt#' placeholder='Apt#' width={8} />
          </Form.Group>
          <Form.Group>
            <Form.Field control={Select} label='Country' options={countryOptions} placeholder='Choose your country' width={8} />
            <Form.Input label='State' placeholder='State' width={8} />
          </Form.Group>
          <Divider horizontal><h4>Billing Information</h4></Divider>
          <Form.Field control={Select} label='Card Type' options={cardOptions} placeholder='Choose your card' width={16} />
          <Form.Group>
            <Form.Input label='Card Number' placeholder='Card #' width={6} />
            <Form.Input label='CVC' placeholder='CVC' width={4} />
            <Form.Input control={Select} label='Expiration' options={monthOptions} placeholder='Expiration Month' width={4} />
            <Form.Input label='Exp. Year' placeholder='Expiration Year' width={4} />
          </Form.Group>
          <Divider horizontal><h4>Order</h4></Divider>
          <ModalOrder total={this.props.total} />
        </Form>
      </div >
    );
  }
}

function mapState(state) {
  return {
    total: ('' + (state.cart.length * 0.99)).substr(0, 4),
    authenticated: state.auth.authenticated,
    cartIsEmpty: state.cart.length === 0
  }
}

function mapDispatch(dispatch) {
  return {

  }
}

export default connect(mapState, mapDispatch)(CashDesk);