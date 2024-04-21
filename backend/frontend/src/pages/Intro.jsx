import React, { useState, useEffect } from "react";
import api from "../api";


const Intro = () => {
    const [user, setUser] = useState({'username': 'topi', 'password': 'development'});

    const loginApi = async (e) => {
        e.preventDefault();
        try {
            const status = await api.post('api/login/', user);
            if (status.status === 201) {
                console.log('accepted');
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input 
                    type="text"
                    name="username"
                    // value={formData.username}
                    // onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    // value={formData.password}
                    // onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Intro;