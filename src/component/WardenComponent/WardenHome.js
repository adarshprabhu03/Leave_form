import React from 'react';
import { NavLink } from 'react-router-dom';
import holiday from '../../images/holiday.jpg'
import '../../Css/HomeAbout.css'
const WardenHome = () => {
    return (
        <>
            <div className="fillpart">
                <div className="mainSection">
                    <div className="contentBox">
                        <h1 class="child1">VLEAVE</h1>
                        <p>Approve your Hostelites Leave in one go. No more additional Lines outside office</p>
                    </div>
                    <div className="imageContainer">
                        <img src={holiday} alt="about" />
                    </div>

                </div>
                <div className="btnBox2">
                    <div className="btn2">
                        <NavLink to="/LeaveApprove" className="LeaveForm">APPROVE LEAVE</NavLink>
                    </div>
                </div>
            </div>

        </>
    )
}
export default WardenHome;