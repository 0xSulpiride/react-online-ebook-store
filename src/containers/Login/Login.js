import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import * as authAction from '../../actions/auth';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.props.login(values);
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <Form.Field>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && error && <Message negative>{error}</Message>}
        </div>
      </Form.Field>
    );
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <Field name="email" component={this.renderField} type="text" label="Email" />
          <Field name="password" component={this.renderField} type="password" label="Password" />
          <Button type='submit'>Login</Button>
        </Form>
      </div>
    );
  }
}

export default connect(null, (dispatch) => ({
  login: bindActionCreators(authAction.login, dispatch)
}))(reduxForm({
  form: 'login',
  validate
})(Login));