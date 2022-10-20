import React, { useState } from 'react'
import Btn from '../components/Btn'
import "./wlc.css"
import LazyLoad from "react-lazyload";


const WelcomPage = ({setWlc}) => {

const [second, setsecond] = useState(15)
const [hour, sethour] = useState(11)
const [date, setdate] = useState(10)
const [minute, setminute] = useState(10)
const [month, setmonth] = useState(7)
const [day, setday] = useState(0)
const [menu, setmenu] = useState(false)
const [AM, setAM] = useState("AM")
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


setInterval(() => {
let [month, date, year] = new Date().toLocaleDateString("en-US").split("/");
let [hour, minute, second] = new Date()
   .toLocaleTimeString("en-US")
   .split(/:| /);
   setsecond(second)
   setdate(date)
   sethour(hour)
   setminute(minute)
   setmonth(month)
   setday(new Date().getDay())  
   setAM(new Date()
   .toLocaleTimeString("en-US").split(" ")[1])

}, 1000);    

    return (
        <LazyLoad>

        <div className='container' >
            <div className='bar' style={{height : "100vh" , width:"130px",position : "absolute",right:"0",display:"flex",alignItems:"center",zIndex:"0"}}
            onMouseOver={()=>{setmenu(true)}}
            >
                
                <div style={{height:"90px",background:"#9898a2",width:"2px",borderRadius:"15px"}}></div>
            </div>
            <div className='bar2' style={{height : "100vh" , width:"90vw",position : "absolute",right:"130px",display:"flex",alignItems:"center",zIndex:"0"}}
            onMouseOver={()=>{setmenu(false)}}
            >
            </div>
            <Btn name="Map" id="0" anim={menu} setWlc={setWlc}  />
            <Btn name="How to use" id="1" anim={menu}/>
            <Btn name="Full screen" id="2"anim={menu}/>
            <Btn name="Contact me" id="3"anim={menu}/>

            <div className='content'>
                <div className='top'>
                        <div className='time'>{(hour<=9)?"0" :""}{hour}:{minute}</div>
                        <div className='details'>
                            <div>{AM}</div>
                            <div className='s'>{second}</div>
                        </div>
                </div>
                <div className='day'>
                    {days[day]} - {months[month-1]} {date}
                </div>
            </div>
        </div>
    </LazyLoad>       
    )
}

export default WelcomPage