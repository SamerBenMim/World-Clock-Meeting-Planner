import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import WelcomPage from "./pages/welcomPage";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>

      {/* <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip> */}
      <WelcomPage/>
    </div>
  );
}

export default App;


