import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Select } from 'semantic-ui-react'

class CashDesk extends Component {
  render() {
    return (
      <div id="cash-desk">
        <Form loading>
          <Form.Group widths='equal'>
            <Form.Input id='form-subcomponent-shorthand-input-first-name' label='First name' placeholder='First name' />
            <Form.Input id='form-subcomponent-shorthand-input-last-name' label='Last name' placeholder='Last name' />
          </Form.Group>
          <Form.Input label='Email' placeholder='Email' />
          <Form.Group widths='equal'>
            <Form.Input label='Card Number' placeholder='Card Number' />
            <Form.Input label='Security Code' placeholder='Security Code (3 on back, Amex: 4 on front)' />
            <Select placeholder='Expiration Date' options={[{
              key: 'kek',
              text: 'Kek',
              value: 'Kek'
            }]} />
          </Form.Group>
        </Form>
        <Button
          disabled
          color='teal'
          content='Order'
          icon='shop'
          label={{ basic: true, color: 'teal', pointing: 'left', content: `$${this.props.total}` }} />
      </div>
    );
  }
}

function mapState(state) {
  return {
    total: ('' + (state.cart.length * 0.99)).substr(0, 4)
  }
}

function mapDispatch(dispatch) {
  return {

  }
}

export default connect(mapState, mapDispatch)(CashDesk);