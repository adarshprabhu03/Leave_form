import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

const LeaveStatus = () => {
    const [leaveStatusData, setLeaveStatusData] = useState([]);

    useEffect(() => {
        const userCookie = Cookies.get('userCookie');
        const apiUrl = `http://192.168.253.204:5000/leave_student?username=${userCookie}`;

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setLeaveStatusData(response.data.rows);
                leaveStatusData.map((leave) => { console.log(leave); })
            } catch (error) {
                console.error('Error fetching leave status data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '85vh',
                backgroundColor: '#D9F8C4' // Set the background color to yellow
            }}
        >
            <div
                style={{
                    backgroundColor: '#FFCECE', // Set the background color of the pink box
                    padding: '20px',
                    maxWidth: '800px' // Adjust the width of the pink box as needed
                }}
            >
                <>
                    <h1 style={{ marginBottom: '20px', color: '#A0D995' }}>LEAVE STATUS</h1>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th className="text-center" style={{ paddingRight: '80px' }}>Leave ID</th>
                                <th className="text-center" style={{ paddingRight: '80px' }}>Visiting Place</th>
                                <th className="text-center" style={{ paddingRight: '80px' }}>Purpose</th>
                                <th className="text-center" style={{ paddingRight: '100px' }}>Start Date</th>
                                <th className="text-center" style={{ paddingRight: '100px' }}>End Date</th>
                                <th className="text-center" style={{ paddingRight: '10px' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveStatusData.map((leave) => (
                                <tr key={leave.leave_id}>
                                    <td className="text-center">{leave.leave_id}</td>
                                    <td className="text-center">{leave.address}</td>
                                    <td className="text-center">{leave.purpose}</td>
                                    <td className="text-center" style={{ paddingRight: '50px' }}>{new Date(leave.out_time).toLocaleString()}</td>
                                    <td className="text-center" style={{ paddingRight: '50px' }}>{new Date(leave.in_time).toLocaleString()}</td>
                                    <td className="text-center">
                                        {leave.proctor_approval === null ? "Waiting for proctor approval" :
                                            leave.proctor_approval === -1 ? "Rejected by proctor" :
                                                leave.warden_approval === -1 ? "Rejected by warden" :
                                                    leave.proctor_approval && leave.warden_approval ? "Both approved" :
                                                        leave.proctor_approval ? "Waiting for warden approval" :
                                                            "Waiting for proctor approval"}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            </div>
        </div>
    );
}

export default LeaveStatus;
