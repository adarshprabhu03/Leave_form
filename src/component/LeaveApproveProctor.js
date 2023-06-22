import React from 'react'
import { Table } from 'react-bootstrap';
const LeaveApproveProctor = () => {
    const leaveStatusData = [
        { id: 1, startDate: '2023-06-15', endDate: '2023-06-20'},
        { id: 2, startDate: '2023-06-25', endDate: '2023-06-30'},
        { id: 3, startDate: '2023-07-05', endDate: '2023-07-10'}
      ];
  return (
    <div style={{backgroundColor:'#D9F8C4'}}> <>
    <h1 style={{ marginBottom: '20px' }}>LEAVE STATUS</h1>
    <Table bordered style={{ paddingLeft: '300px' }}>
        <thead>
          <tr>
            <th className="text-center" style={{ paddingRight: '80px' }}>Leave ID</th>
            <th className="text-center" style={{ paddingRight: '80px' }}>Start Date</th>
            <th className="text-center" style={{ paddingRight: '80px' }}>End Date</th>
            <th className="text-center" style={{ paddingRight: '80px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveStatusData.map((leave) => (
            <tr key={leave.id}>
              <td className="text-center">{leave.id}</td>
              <td className="text-center" style={{ paddingRight: '8px' }}>{leave.startDate}</td>
              <td className="text-center" style={{ paddingRight: '8px' }} >{leave.endDate}</td>
              <td className="text-center">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </></div>
  )
}

export default LeaveApproveProctor
