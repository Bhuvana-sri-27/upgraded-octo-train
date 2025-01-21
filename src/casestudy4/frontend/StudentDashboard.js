import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState({
        name: '',
        phoneNumber: '',
        branch: '',
        emailId: '',
        cgpa: '',
        backlogs: '',
        placementsAttended: '',
        eligibleForPlacements: ''
    });
    const [isEdit, setIsEdit] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(true);

    // Fetch student data from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('studentData');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setStudentData(parsedData);
                setIsFormVisible(false);
                setIsEdit(true);
            } catch (error) {
                console.error('Error parsing JSON from localStorage', error);
            }
        }
    }, []);

    const handleInputChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/student-registration', {
            method: 'POST',
            body: JSON.stringify(studentData),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        alert(data.message);
        if (data.success) {
            setIsFormVisible(false);
            setIsEdit(true);
            localStorage.setItem('studentData', JSON.stringify(studentData)); // Save to local storage
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Student Dashboard</h2>
            {isFormVisible ? (
                <form onSubmit={handleSubmit} className="student-form">
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" name="name" value={studentData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input type="text" name="phoneNumber" value={studentData.phoneNumber} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Branch: </label>
                        <input type="text" name="branch" value={studentData.branch} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email ID: </label>
                        <input type="email" name="emailId" value={studentData.emailId} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>CGPA: </label>
                        <input type="text" name="cgpa" value={studentData.cgpa} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Backlogs: </label>
                        <input type="number" name="backlogs" value={studentData.backlogs} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Placements Attended: </label>
                        <input type="text" name="placementsAttended" value={studentData.placementsAttended} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Eligible for Placements: </label>
                        <select name="eligibleForPlacements" value={studentData.eligibleForPlacements} onChange={handleInputChange} required>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">{isEdit ? 'Update' : 'Submit'}</button>
                </form>
            ) : (
                <div className="student-info">
                    <h3 className="info-title">Profile Information</h3>
                    <div className="info-container">
                        <div className="info-item"><strong>Name:</strong> {studentData.name}</div>
                        <div className="info-item"><strong>Phone Number:</strong> {studentData.phoneNumber}</div>
                        <div className="info-item"><strong>Branch:</strong> {studentData.branch}</div>
                        <div className="info-item"><strong>Email ID:</strong> {studentData.emailId}</div>
                        <div className="info-item"><strong>CGPA:</strong> {studentData.cgpa}</div>
                        <div className="info-item"><strong>Backlogs:</strong> {studentData.backlogs}</div>
                        <div className="info-item"><strong>Placements Attended:</strong> {studentData.placementsAttended}</div>
                        <div className="info-item"><strong>Eligible for Placements:</strong> {studentData.eligibleForPlacements}</div>
                    </div>
                    <button className="edit-button" onClick={() => setIsFormVisible(true)}>Edit</button>
                </div>
            )}
        </div>
    );
}
