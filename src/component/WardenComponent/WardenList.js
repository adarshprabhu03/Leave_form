import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../../Css/ListStyle.css';
import Cookies from 'js-cookie';
const WardenList=()=>{
    const handleclick=async (e)=>{
        Cookies.remove('userCookie');
        window.location.reload();
    }
    return(
        <>
        <header>
            <div className="container container-flex">
                <div className="logoContainer">
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <nav>
                    <div className="list">
                       <NavLink exact to="/" className="listItem" activeClassName="activeItem">Home</NavLink>
                       <NavLink to="/LeaveApprove" className="listItem" activeClassName="activeItem">LeaveApprove</NavLink>
                       <button className='logoutButton' onClick={handleclick}>Logout</button>
                    </div>
                </nav>
            </div>
        </header>
        </>

    )
}
export default WardenList;