import React, { useState } from 'react'
import "./btn.css"
const Btn = ({name,id,anim,setWlc}) => {
// const [anim, setanim] = useState(false)
  return (
    <div className={` btn ${anim? "anim":""}`  } style={{top:1*(35+ id * 65) +"px" , transitionDelay:(anim)?(0+.15*id)*1+"s" :(0.45-.15*id)*1+"s"  }}
    onClick={()=>{
        setWlc()
    }}
    >
        <div style={{width:"100%",height:"100%",  alignItems: "center",
    justifyContent: "center",cursor: "pointer", display:"flex" ,  borderRadius: "8px"}}>
        {name}
        </div> 
     </div>
  )
}

export default Btn