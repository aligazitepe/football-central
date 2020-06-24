import React, { useState } from 'react';
import auth from '../../utils/auth';
import apiService from '../../services/ApiService';
import './Login.css';

const initialState = {
  email: '',
  password: '',
};

const Login = (props) => {
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
    // Add logic to send a request to API service /login
    const { email, password } = state;
    const user = { email, password };
    const res = await apiService.login(user);
    if (res.error) {
      setState(initialState);
    } else {
      // This sets isAuthenticated = true and redirects to profile
      props.setIsAuthenticated(true);

      setUserInfo(res);
      auth.login(() => props.history.push('/'));
      // REMOVE-START
    }
  };
  const setUserInfo= (userObj) =>
  {
    localStorage.setItem("currentUser",JSON.stringify(userObj))

  }

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div className="formContainer">
      <h2>LOGIN</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="emailInput"
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="emailInput"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="login-submit" type="submit" disabled={validateForm()}>
          &nbsp;LOGIN&nbsp;
        </button>
        <a className="register" href="/register">
          &nbsp;Register?&nbsp;
        </a>
      </form>
    </div>
  );
};

export default Login;
