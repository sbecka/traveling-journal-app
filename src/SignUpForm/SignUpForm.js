/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import './SignUpForm.css';

class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

    handleSignUpSuccess = () => {
      const { history } = this.props;
      history.push('/login');
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { full_name, email, password } = e.target;
      console.log( full_name, email, password);
      this.setState({ error: null });
      AuthApiService.postUser({
        full_name: full_name.value,
        email: email.value,
        password: password.value
      })
      // eslint-disable-next-line no-unused-vars
        .then(user => {
          full_name.value = '';
          email.value = '';
          password.value = '';
          this.handleSignUpSuccess();
        })
        .catch(res => {
          this.setState({ error: res.error });
        });
        
    }

    render() {
      return (
        <section className="signup">
          <header className="signup-header">
            <h2>Sign Up Today</h2>
          </header>
          <form 
            autoComplete="on"
            className="signup-form"
            onSubmit={this.handleSubmit}
          >   
            <div role="alert">
              {this.state.error && <p className="red-this.state.">{this.state.error}</p>}
            </div>
            <div className="signup-field">
              <label htmlFor="full_name">Full Name</label>
              <input 
                type="text" 
                name="full_name" 
                id="full_name"
                aria-label="Enter your full name"
                aria-required="true"
                placeholder="John Doe" 
                required />
            </div>
            <div className="signup-field">
              <label htmlFor="email">Email</label>
              <input 
                type="text" 
                name="email" 
                id="email"
                aria-label="Enter your email address"
                aria-required="true" 
                placeholder="jondoe@email.com" 
                required />
            </div>
            <div className="signup-field">
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off" 
                type="password" 
                name="password" 
                id="password"
                aria-label="Create your password"
                aria-required="true"
                required />
            </div>
            <button type="submit">Sign Up</button>
            <p>OR</p>
            <Link to="/my-journals" type='button'>Explore the Demo</Link>
          </form>
        </section>
      );
    }
}

export default SignUpForm;