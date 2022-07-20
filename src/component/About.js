import React from 'react';
import { NavLink } from 'react-router-dom';
import holiday from '../images/holiday.jpg';
import '../Css/HomeAbout.css';
const About=()=>{
    return(
        <>
        <div className="fillpart">
        <div className="mainSection">
            <div className="contentBox">
                <h1>PROCESS</h1>
                <p>FIRST APPLY LEAVE THEOUGH HERE ANS CHECK LEAVE STATUS AND FINALLY PRINT THE FORM</p>
                <div className="btnBox">
                    <div className="btn">
                        <NavLink to="/About" className="readmore">Read More</NavLink>
                    </div>
                </div>
            </div>
            <div className="imageContainer">
                <img src={holiday} alt="about" />
            </div>

        </div>
        <div className="btnBox2">
            <div className="btn2">
                <NavLink to="/LeaveForm" className="LeaveForm">APPLY FOR LEAVE</NavLink>
            </div>
        </div>
        </div>

    </>
    )
}
export default About;