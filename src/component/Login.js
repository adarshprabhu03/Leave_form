import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import List from '../component/List';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from '../component/Home';
import About from '../component/About';
import LeaveForm from '../component/LeaveForm';
import LeaveStatus from '../component/LeaveStatus';
import error from '../component/error';
import AuthContext from '../context/Authprovi';
import ProctorHome from './ProctorComponent/ProctorHome'
import SignUp from './SignUp';
import axios from '../api/axios';
import '../Css/Login.css';
import logo from '../images/logo.png';
import LeaveApproveProctor from './ProctorComponent/LeaveApproveProctor';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const LOGIN_URL = 'http://192.168.253.204:5000/users/login';

function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [role, setRole] = useState(1);
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const checkUserCookie = () => {
      const userCookie = Cookies.get('userCookie');
      if (userCookie) {
        setSuccess(true);
      }
      setIsLoading(false);
    };
    useEffect(() => {
      userRef.current?.focus();
      checkUserCookie();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ userName: user, password: pwd, account_type: role }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            
            setSuccess(true);
            Cookies.set('userCookie',user)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Invalid Role, Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };
    if (isLoading) {
        return <div>Loading...</div>;
      }
    return (
        <>
            <div
                className="fillpartlogin"
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
            >
                {success ? (
                    role === 1 ? (
                        <section>
                        <Redirect exact from="/" to="/"/>
                        <List />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/LeaveForm" component={LeaveForm} />
                            <Route path="/LeaveStatus" component={LeaveStatus} />
                            <Route component={error} />
                        </Switch>
                    </section>
                    ) : role === 2 ? (
                        <section>
                            <Switch>
                            <Route exact path="/" component={ProctorHome}/>
                            <Route path="/LeaveStatus" component={LeaveApproveProctor} />
                            <Route component={error} />
                            </Switch>
                        </section>
                    ) : role === 3 ? (
                        <section>
                            <Route path="/" component={LeaveApproveProctor}/>
                        </section>
                    ) : null
                ) : (
                    <section>
                    <form onSubmit={handleSubmit} className="loginform">
                        <div>
                            <img src={logo} alt="logo" className="logo" />
                        </div>
                        <span className="disperrmsg">
                            <p
                                ref={errRef}
                                className={errMsg ? 'errmsg' : 'offscreen'}
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                        </span>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="listitems"
                                id="username"
                                name="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="listitems">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="listitems"
                                id="password"
                                ref={userRef}
                                name="password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <div>
                            <label>Role:</label>
                            <div className="role-container">
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={1}
                                        checked={role === 1}
                                        onChange={() => setRole(1)}
                                    />
                                    Student
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={2}
                                        checked={role === 2}
                                        onChange={() => setRole(2)}
                                    />
                                    Proctor
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="role"
                                        value={3}
                                        checked={role === 3}
                                        onChange={() => setRole(3)}
                                    />
                                    Warden
                                </label>
                            </div>
                        </div>
                        <button className="listitems">Sign In</button>
                    </form>
                </section>
                )}
                <div></div>
            </div>
        </>
    );
}

export default Login;