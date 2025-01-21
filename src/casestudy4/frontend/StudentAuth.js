import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentAuth.css';

export default function StudentAuth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [authData, setAuthData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setAuthData({ ...authData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isSignUp ? 'http://localhost:8080/student-signup' : 'http://localhost:8080/student-login';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        if (data.success) {
            const studentResponse = await fetch(`http://localhost:8080/student-data?username=${authData.username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const studentData = await studentResponse.json();

            if (studentData && studentData.username) {
                localStorage.setItem('studentData', JSON.stringify(studentData));
                navigate('/student-dashboard');
            } else {
                alert('Student data not found. Please complete the registration.');
                navigate('/student-dashboard');
            }
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>{isSignUp ? 'Join Our Community' : 'Welcome Back!'}</h2>
                    <p>{isSignUp ? 'Create your account to access the dashboard.' : 'Log in to continue to your placement dashboard.'}</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={authData.username}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Roll No.</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={authData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your roll number..."
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {isSignUp ? 'Create Account' : 'Log In'}
                    </button>
                </form>
                <div className="auth-footer">
                    <p>
                        {isSignUp
                            ? 'Already a User ?'
                            : "New Student ?"}
                        <button className="switch-mode-button" onClick={() => setIsSignUp(!isSignUp)}>
                            {isSignUp ? 'Log In Here' : 'Sign Up Now'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
