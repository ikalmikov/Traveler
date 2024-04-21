import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
		e.preventDefault();

    setFirstName(String(firstName.trim()));
		setLastName(String(lastName.trim()));
		setUsername(String(username.trim()));
		setPassword(String(password.trim()));
		const user = {
      "first_name" : firstName,
      "last_name" : lastName,
			"username" : username,
			"password" : password
		};
		console.log(user);

		try {
      // Signup Request
			const response = await api.post('api/signup/', user);
			console.log(response.data);

			if(response.status == 201){
				console.log("yes");

        // If Signup succesful, login
				const user = {
          "username" : username,
          "password" : password
        };
        console.log(user);
        try {
          // Login Request
          const response = await api.post('api/login/', user);
          console.log(response.data);
          if(response.status == 201){
            return navigate("/my-itineraries");
          }
        } catch (err) {
          console.log(err);
        };
			}
		} catch (err) {
			console.log(err);
		};
  };


  return (
		<div>
      <h1>Sign Up</h1>
			<form onSubmit={handleSignup}>
        <div>
					<label>First Name:</label>
					<input 
						type="text"
						name="firstname"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
        <div>
					<label>Last Name:</label>
					<input 
						type="text"
						name="lastname"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
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
				<button type="submit">Sign Up</button>
			</form>
		</div>
  );
};

export default Signup;