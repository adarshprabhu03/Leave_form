import React from 'react';
import { Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import LeaveForm from './component/LeaveForm';
import LeaveStatus from './component/LeaveStatus';
import error from './component/error';
import List from './component/List';
import Login from './component/Login';
import SignUp from './component/SignUp';
import LeaveApproveProctor from './component/ProctorComponent/LeaveApproveProctor';
function App() {
  return (
    <>
     
      {/*<LeaveApproveProctor/>*/}
      <Login/>
      
       {/*<List/>

   <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/LeaveForm" component={LeaveForm}/>
      <Route path="/LeaveStatus" component={LeaveStatus}/>
      <Route path="/SignUp" component={SignUp}/>
      <Route component={error}/>
  </Switch>*/}
    </>
  )
}

export default App;
