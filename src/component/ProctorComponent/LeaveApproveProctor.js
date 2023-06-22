import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import '../../Css/LeaveApprove.css'

const LeaveApproveProctor = () => {
  const [leaveStatusData, setLeaveStatusData] = useState([
    { id: 1, startDate: '2023-06-15', endDate: '2023-06-20', status: '' },
    { id: 2, startDate: '2023-06-25', endDate: '2023-06-30', status: '' },
    { id: 3, startDate: '2023-07-05', endDate: '2023-07-10', status: '' }
  ]);

  const handleStatusChange = (e, leaveId) => {
    const updatedData = leaveStatusData.map((leave) =>
      leave.id === leaveId ? { ...leave, status: e.target.value } : leave
    );
    setLeaveStatusData(updatedData);
  };

  const handleSubmit = (leaveId) => {
    // Perform further actions with the leave status data for the specific leave, such as submitting it to a server
    const leave = leaveStatusData.find((leave) => leave.id === leaveId);
    console.log(`Leave ID: ${leaveId}, Status: ${leave.status}`);
  };

  return (
    <div style={{ backgroundColor: '#D9F8C4' ,
        height: '100vh',
        width: '100vw'
        }}>
      <h1 style={{ marginBottom: '20px' }}>LEAVE STATUS</h1>
      <Table bordered style={{ marginLeft: 'auto', marginRight: 'auto', width: '700px' }}>
        <thead>
          <tr>
            <th className="text-center">Leave ID</th>
            <th className="text-center">Start Date</th>
            <th className="text-center">End Date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveStatusData.map((leave) => (
            <tr key={leave.id}>
              <td className="text-center" >{leave.id}</td>
              <td className="text-center">{leave.startDate}</td>
              <td className="text-center">{leave.endDate}</td>
              <td className="text-center">
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={leave.status}
                    onChange={(e) => handleStatusChange(e, leave.id)}
                  >
                    <option value="">Select Status</option>
                    <option value="Accepted">Accept</option>
                    <option value="Rejected">Reject</option>
                  </Form.Control>
                </Form.Group>
              </td>
              <td className="text-center">
                <Button className="approvebut" onClick={() => handleSubmit(leave.id)}>
                  SUBMIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default LeaveApproveProctor;
