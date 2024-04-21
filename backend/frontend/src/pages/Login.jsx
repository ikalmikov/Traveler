import React from 'react';
import axios from "axios";
import api from '../api';

const Login = () => {
  const username = 'topi'; // Replace with actual username
  const password = 'development'; // Replace with actual password{ username, password }

  const login = async () => {
    try {
      const response = await api.post('api/login/', {  'username': username, 'password' : password });
      console.log(response.data);

    //   let session = await api.get('/api/session', {
    //     headers: {
    //         'X-CSRFToken': Cookies.get('csrftoken'),
    //         'Content-Type': 'application/json'
    //     }
    // }, { withCredentials: true });
    //   console.log(session.data);
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
        console.error(error);
      // Handle login error
    }
  };

  const logout = async () => {
    try {
      const response = await api.get('/api/logout/');
      console.log(response.data);
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
        console.error(error);
      // Handle login error
    }
  };
  
  return (
    <div>
        <h1>Login</h1>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
    </div>
  )
};

export default Login;