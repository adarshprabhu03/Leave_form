import React from 'react';
import { NavLink } from 'react-router-dom';
import holiday from '../../images/holiday.jpg'
import '../../Css/HomeAbout.css'
const Home = () => {
    return (
        <>
            <div className="fillpart">
                <div className="mainSection">
                    <div className="contentBox">
                        <h1 class="child1">VLEAVE</h1>
                        <p>Approve your Proctee's Leave in one go. No more additional mails</p>
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
export default Home;