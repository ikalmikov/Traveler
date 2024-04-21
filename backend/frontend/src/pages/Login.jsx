import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	let navigate = useNavigate();

	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	// const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
		e.preventDefault();

		setUsername(String(username.trim()));
		setPassword(String(password.trim()));
		const user = {
			"username" : username,
			"password" : password
		};
		console.log(user);

		try {
			const response = await api.post('api/login/', user);
			console.log(response.data);
			if(response.status == 201){
				console.log("yes");
				return navigate("/my-itineraries");
			}
		} catch (err) {
			console.log(err);
		};
  };

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
      const response = await api.get('api/logout/');
      console.log(response.data);
			if(response.status == 200){
				console.log("yes");
				return navigate("/");
			}

    } catch (err) {
      console.log(err);
    };
	};


  return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<div>
					<label>Username:</label>
					<input 
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<form onSubmit={handleLogout}>
				<button type="submit">Logout</button>
			</form>
		</div>
  );
};

export default Login;