import React, { useState } from 'react'
import "./wlc.css"

const WelcomPage = () => {

const [second, setsecond] = useState(15)
const [hour, sethour] = useState(11)
const [date, setdate] = useState(10)
const [minute, setminute] = useState(10)
const [month, setmonth] = useState(7)
const [day, setday] = useState(0)
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
        <div className='container'>
            <div className='content'>
                <div className='top'>
                        <div className='time'>{(hour<9)?"0" :""}{hour}:{minute}</div>
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
    )
}

export default WelcomPage