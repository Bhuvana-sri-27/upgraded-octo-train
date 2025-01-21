import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="content">
                <h1>Student-Admin Management System</h1>
                <p className="welcome-text">Effortlessly manage students and administrators</p>
                <div className="button-group">
                    <button className="login-btn" onClick={() => navigate('/student-login')}>Student Login</button>
                    <button className="login-btn admin-btn" onClick={() => navigate('/admin-login')}>Admin Login</button>
                </div>
            </div>
        </div>
    );
}
