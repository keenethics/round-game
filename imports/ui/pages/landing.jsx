import React from 'react';

import Layout from '/imports/ui/layout/layout';

import { signin, signup } from '/imports/api/users/actions';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSigninForm: true,
      username: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.toggleOfForms = this.toggleOfForms.bind(this);
  }
  onSignin(e) {
    e.preventDefault();

    const { email, password } = this.state;

    signin(email.value, password.value);
  }
  onSignup(e) {
    e.preventDefault();

    const { username, email, password } = this.state;

    signup(username.value, email.value, password.value);
  }
  onInputChange({ target }) {
    this.setState({
      [target.name]: {
        value: target.value,
        error: '',
      },
    });
  }
  toggleOfForms(e) {
    e.preventDefault();

    this.setState({
      showSigninForm: !this.state.showSigninForm,
      username: {
        value: '',
        error: '',
      },
      email: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      },
    });
  }
  render() {
    const {
      showSigninForm,
      username,
      email,
      password,
    } = this.state;

    return (
      <Layout name="landing">
        {showSigninForm && (
          <form onSubmit={this.onSignin}>
            <fieldset>
              <input
                type="text"
                value={email.value}
                name="email"
                placeholder="Username or email"
                onChange={this.onInputChange}
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                value={password.value}
                name="password"
                placeholder="Password"
                onChange={this.onInputChange}
              />
            </fieldset>
            <input type="submit" value="Sign in" />
            <p>Do not have an account yet? <a href="/" onClick={this.toggleOfForms}>Sign up now</a></p>
          </form>
        )}
        {showSigninForm || (
          <form onSubmit={this.onSignup}>
            <fieldset>
              <input
                type="text"
                value={username.value}
                name="username"
                placeholder="Username"
                onChange={this.onInputChange}
              />
            </fieldset>
            <fieldset>
              <input
                type="text"
                value={email.value}
                name="email"
                placeholder="Email"
                onChange={this.onInputChange}
              />
            </fieldset>
            <fieldset>
              <input
                type="password"
                value={password.value}
                name="password"
                placeholder="Password"
                onChange={this.onInputChange}
              />
            </fieldset>
            <input type="submit" value="Sign up" />
            <p>Already have an account yet? <a href="/" onClick={this.toggleOfForms}>Sign in now</a></p>
          </form>
        )}
      </Layout>
    );
  }
}
