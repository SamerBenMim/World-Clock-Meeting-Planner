import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import WelcomPage from "./pages/welcomPage";

function App() {
  const [content, setContent] = useState("");
  const [wlc, setwlc] = useState(true)
  const setWlc = ()=>{
    setwlc(false)
  }
  const setnotWlc = ()=>{
    setwlc(true)
  }
  return (
    <div>

      {!wlc &&<><MapChart setTooltipContent={setContent} setWlc={setnotWlc} />
      <ReactTooltip>{content}</ReactTooltip>
      
      </>
      }

      {wlc&& <WelcomPage setWlc ={setWlc}/>} 
    </div>
  );
}

export default App;


