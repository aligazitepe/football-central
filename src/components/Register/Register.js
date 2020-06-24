import React, { useState } from 'react';
import auth from '../../utils/auth';
import apiService from '../../services/ApiService';
import './Register.css';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Register = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send send a request to the API service /register
    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await apiService.register(user);
    if (res.error) {
      setState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      setUserInfo(res);
      props.setIsAuthenticated(true);
      auth.login(() => props.history.push('/'));
    }
  };

  const setUserInfo = (userObj) => {
    localStorage.setItem("currentUser",JSON.stringify(userObj))
  }

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  return (
    <div className="registerContainer">
      <h2>REGISTER</h2>
      <form className="registerForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
        />
        <button className="registerBtn" type="submit" disabled={validateForm()}>
          &nbsp;Register for Football Central&nbsp;
        </button>
      </form>
    </div>
  );
};

export default Register;
