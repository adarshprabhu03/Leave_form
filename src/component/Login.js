import React from 'react'
import { useRef, useState, useEffect } from 'react';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        useRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit=async(e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <h1>hello world</h1>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
                <label htmlFor='password'>Password:</label>
                <input type="password" id="password" ref={userRef} autoComplete="off" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                <button>Sign In</button>
            </form>
        </div>
    )
}

export default Login;
