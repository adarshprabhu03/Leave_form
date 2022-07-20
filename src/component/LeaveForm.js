
import Axios from "axios";
import React from 'react';
import { useState } from 'react';
import '../Css/leaveformstyle.css';
function LeaveForm(){
const url=""
const[data,setData]=useState({
    reg_no:"",
    addr:"",
    purpose:"",
    out_time:"",
    in_time:""

})
function handle(e){
const newdata={...data}
newdata[e.target.id]=e.target.value
setData(newdata)
console.log(newdata)
}
function submit(e){
    e.preventDefault()
    Axios.post(url,{
        reg_no:data.reg_no,
        addr:data.addr,
        purpose:data.addr,
        out_time:data.out_time,
        in_time:data.in_time
    })
    .then(res=>{
        console.log(res.data)
    })
   
}

    return (
        <>
            <div className='fillform'>
                <h1>APPLY FOR LEAVE</h1>
                <form className="finalform" id="sample-form" onSubmit={(e)=>submit(e)}>
                    <div>
                        <label htmlFor="reg_no">REGISTER NUMBER</label>
                        <input type="text" id="reg_no" onChange={(e)=>handle(e)} value={data.reg_no} placeholder="Enter Your Registration-Number" name="reg_no" />

                    </div>
                    <div>
                        <label htmlFor="addr">ADDRESS</label>
                        <textarea id="addr" onChange={(e)=>handle(e)} value={data.addr} placeholder='Enter Permanent Address' name="addr"></textarea>

                    </div>
                    <div>
                        <label htmlFor="purpose">PURPOSE</label>
                        <textarea id="purpose" onChange={(e)=>handle(e)} value={data.purpose} placeholder='Enter Purpose Of Visit' name="purpose"></textarea>

                    </div>
                    <div>
                        <label htmlFor="out_time">OUT TIME</label>
                        <input type="datetime-local" id="out_time" onChange={(e)=>handle(e)} value={data.out_time} name="out_time" />

                        <label htmlFor="in_time">IN TIME</label>
                        <input type="datetime-local" id="in_time" onChange={(e)=>handle(e)} value={data.in_time} name="in_time" />
                    </div>
                    <div className='fillbutton'>
                        <button className='btn3' type="submit" id="SubmitButton">SUBMIT</button>
                    </div>
                </form>
            </div>
        </>
    )

}
export default LeaveForm;