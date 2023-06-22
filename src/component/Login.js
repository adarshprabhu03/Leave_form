import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import List from '../component/List';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from '../component/Home';
import About from '../component/About';
import LeaveForm from '../component/LeaveForm';
import LeaveStatus from '../component/LeaveStatus';
import error from '../component/error';
import AuthContext from '../context/Authprovi';
import SignUp from './SignUp';
import axios from '../api/axios';
import '../Css/Login.css'
import logo from '../images/logo.png';
const LOGIN_URL = 'http://192.168.253.204:5000/users/login'
function Login() {
    const { setAuth } = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
       { e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ userName: user, password: pwd }), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
        setPwd(''); 
            setSuccess(true);
        } catch (err) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status == 400) {
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status == 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }}
        //setSuccess(true);//delete afterwards
    }
    return (
        <>

            <div className='fillpartlogin'>
                {success ? (
                    <section>
                        <List />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/LeaveForm" component={LeaveForm} />
                            <Route path="/LeaveStatus" component={LeaveStatus} />
                            <Route component={error} />
                        </Switch>
                    </section>
                ) : (
                    <section>
                        <form onSubmit={handleSubmit} className="loginform">

                            <div>
                                <img src={logo} alt="logo" className="logo" />
                            </div>
                            <span className='disperrmsg'>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            </span>
                            <div>
                                <label htmlFor="username" >Username:</label>
                                <input type="text" className='listitems' id="username" name="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
                            </div>
                            <div>
                                <label htmlFor="password" className='listitems'>Password:</label>
                                <input type="password" className='listitems' id="password" ref={userRef} name="password" autoComplete="off" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                            </div>
                            <button className='listitems'>Sign In</button>
                        </form>
                    </section>

                )

                }
                <div>

                </div>

            </div>

        </>
    )
}

export default Login;


