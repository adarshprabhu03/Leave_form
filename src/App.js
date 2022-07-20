import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import LeaveForm from './component/LeaveForm';
import LeaveStatus from './component/LeaveStatus';
import error from './component/error';
import List from './component/List'
function App(){
  return(
    <>
    <List/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/LeaveForm" component={LeaveForm}/>
      <Route path="/LeaveStatus" component={LeaveStatus}/>
      <Route component={error}/>

    </Switch>
    </>
  )
}

export default App;
