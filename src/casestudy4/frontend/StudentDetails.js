import React from 'react';
import { useLocation } from 'react-router-dom';
import './StudentDetails.css';

export default function StudentDetails() {
    const location = useLocation();
    const { studentData } = location.state || {};

    if (!studentData) {
        return <div>No student data available.</div>;
    }

    return (
        <div className="student-details">
            <h2>Student Details</h2>
            <div className="detail-row"><strong>First Name:</strong> {studentData.firstName}</div>
            <div className="detail-row"><strong>Last Name:</strong> {studentData.lastName}</div>
            <div className="detail-row"><strong>Father's Name:</strong> {studentData.fatherName}</div>
            <div className="detail-row"><strong>Gender:</strong> {studentData.gender}</div>
            <div className="detail-row"><strong>Branch:</strong> {studentData.branch}</div>
            <div className="detail-row"><strong>Roll No:</strong> {studentData.rollNo}</div>
            <div className="detail-row"><strong>Mother's Name:</strong> {studentData.motherName}</div>
            <div className="detail-row"><strong>Phone Number:</strong> {studentData.phoneNumber}</div>
            <div className="detail-row"><strong>Email ID:</strong> {studentData.emailId}</div>
            <div className="detail-row"><strong>Address:</strong> {studentData.address}</div>
            <div className="detail-row"><strong>City:</strong> {studentData.city}</div>
            <div className="detail-row"><strong>State:</strong> {studentData.state}</div>
            <div className="detail-row"><strong>Country:</strong> {studentData.country}</div>
            <div className="detail-row"><strong>Date of Birth:</strong> {studentData.dateOfBirth}</div>
            <div className="detail-row"><strong>Blood Group:</strong> {studentData.bloodGroup}</div>
        </div>
    );
}
