import React, { useState, useEffect } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../Css/LeaveApprove.css';
import Cookies from 'js-cookie';

const WardenApprove = () => {
  const [leaveStatusData, setLeaveStatusData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 5;
  const pagesToShow = 1;
  const fetchLeaveData = async () => {
    try {
      const userCookie = Cookies.get('userCookie');
      const response = await axios.get(`http://192.168.253.204:5000/leave_warden?username=${userCookie}`);
      console.log(response.data);
      setLeaveStatusData(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  };
  useEffect(() => {


    fetchLeaveData();
  }, []);

  const handleStatusChange = (e, leaveId) => {
    const updatedData = leaveStatusData.map((leave) => {
      if (leave.leave_id === leaveId) {
        return { ...leave, status: e.target.value };
      }
      return leave;
    });
    setLeaveStatusData(updatedData);
  };
  

  const handleSubmit = async (leaveId) => {
    try {
      const leave = leaveStatusData.find((leave) => leave.leave_id === leaveId);
      console.log(`Leave ID: ${leaveId}, Status: ${leave.status}`);
  
      // Make a POST request to the endpoint
      const response = await axios.post('http://192.168.253.204:5000/warden_approve', {
        status: Number(leave.status),
        leave_id: leaveId
      });
  
      // Handle the response as needed
      console.log('POST request response:', response.data);
  
      // Reset the status of the submitted leave
      const updatedData = leaveStatusData.map((leave) =>
        leave.leave_id === leaveId ? { ...leave, status: '' } : leave
      );
      setLeaveStatusData(updatedData);
  
      // Refresh the leave table
      fetchLeaveData();
    } catch (error) {
      console.error('Error submitting leave status:', error);
    }
  };
  

  // Get current leaves based on pagination
  const indexOfLastLeave = currentPage * leavesPerPage;
  const indexOfFirstLeave = indexOfLastLeave - leavesPerPage;
  const currentLeaves = leaveStatusData.slice(indexOfFirstLeave, indexOfLastLeave);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Determine the page numbers to display in pagination
  const getPageNumbers = () => {
    const totalPages = Math.ceil(leaveStatusData.length / leavesPerPage);
    const currentPageIndex = currentPage - 1;
    let startPageIndex = currentPageIndex - pagesToShow;
    let endPageIndex = currentPageIndex + pagesToShow;

    if (startPageIndex < 0) {
      startPageIndex = 0;
      endPageIndex = pagesToShow * 2;
    }

    if (endPageIndex >= totalPages) {
      endPageIndex = totalPages - 1;
      startPageIndex = totalPages - pagesToShow * 2;
      startPageIndex = startPageIndex < 0 ? 0 : startPageIndex;
    }

    return Array.from({ length: endPageIndex - startPageIndex + 1 }, (_, index) => startPageIndex + index + 1);
  };

  return (
    <div
      style={{
        backgroundColor: '#D9F8C4',
        height: '100vh',
        width: '100vw',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>LEAVE STATUS</h1>
      <Table bordered style={{ marginLeft: 'auto', marginRight: 'auto', width: '900px' }}>
        <thead>
          <tr>
            <th className="text-center">Leave ID</th>
            <th className="text-center">Name</th>
            <th className="text-center">Contact</th>
            <th className="text-center">Start Date</th>
            <th className="text-center">End Date</th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentLeaves.map((leave) => (
            <tr key={leave.id}>
              <td className="text-center">{leave.leave_id}</td>
              <td className="text-center">{leave.name}</td>
              <td className="text-center">{leave.contact}</td>
              <td className="text-center">{new Date(leave.out_time).toLocaleString()}</td>
              <td className="text-center">{new Date(leave.in_time).toLocaleString()}</td>
              <td className="text-center">
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={leave.status}
                    onChange={(e) => handleStatusChange(e, leave.leave_id)}
                  >
                    <option value="">Select Status</option>
                    <option value={1}>Accept</option>
                    <option value={-1}>Reject</option>
                  </Form.Control>
                </Form.Group>
              </td>
              <td className="text-center">
                <Button className="approvebut" onClick={() => handleSubmit(leave.leave_id)}>
                  SUBMIT
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="pagination" style={{ textAlign: 'center' }}>
        {currentPage > pagesToShow && (
          <Button className="approvebut" onClick={() => paginate(currentPage - pagesToShow)}>
            &laquo;
          </Button>
        )}
        {getPageNumbers().map((pageNumber) => (
          <Button
            className={`approvebut2 ${currentPage === pageNumber ? 'active' : ''}`}
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        {currentPage < Math.ceil(leaveStatusData.length / leavesPerPage) - pagesToShow + 1 && (
          <Button className="approvebut" onClick={() => paginate(currentPage + pagesToShow)}>
            &raquo;
          </Button>
        )}
      </div>
    </div>
  );
};

export default WardenApprove;
