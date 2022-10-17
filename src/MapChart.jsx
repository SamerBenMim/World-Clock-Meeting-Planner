import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import "./style.css"
import p from "./assets/img_194962.png"
const MapChart = ({ setTooltipContent, setWlc }) => {
  function addHoursToDate(date, hours) {
    return <div>{new Date(new Date(date).setHours(date.getHours() + hours)).toLocaleString('en-US')}</div> 
      
  }
  let myDate = new Date();
  const monSet = new Set();
  const [clicked, setClicked] = useState([])
  useEffect(() => {
    let a = document.querySelector(".rsm-svg")
    a.setAttribute("viewBox", "25 80 800 600");

  }, [])
  return (<>
    <img src="https://icons.veryicon.com/png/o/miscellaneous/tool-icon-library/return-104.png" style={{ position: "absolute", top: "20px", left: "20px", width: "40px", opacity: "0.7", cursor: "pointer" }}
      onClick={() => { setWlc() }}
    />
    <div data-tip="">
      <ComposableMap >
        <ZoomableGroup zoom={.85} minZoom={0.7}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  id={geo.id}
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    console.log(geo)
                    setTooltipContent(`${geo.properties.name} (UTC ${(geo.properties.time) > 0 ? "+" : ""}${geo.properties.time})`);
                  }}
                  onClick={
                    () => {
                      if (clicked.includes(geo.properties.name + "/" + geo.properties.time)) setClicked(clicked => clicked.filter(el => el != geo.properties.name + "/" + geo.properties.time))
                      else setClicked(clicked => [...clicked, geo.properties.name + "/" + geo.properties.time])
                      document.querySelector(`#${geo.id}`).setAttribute("style", "fill:red ; outline: none;")
                    }
                  }
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: (clicked.includes(geo.properties.name + "/" + geo.properties.time)) ? "red" : "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                      cursor: "pointer"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
    <div className="cont">
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex" }}>
          <h1>Selected countries</h1>
        </div>
        <div>
          {clicked.map(el => <div className="country">{el.split("/")[0]}  (UTC {(el.split("/")[1]) >= 0 ? "+" : ""}{el.split("/")[1]} )</div>)}

        </div>
      </div>
      <div style={{ width: "300px", marginLeft: "40px" ,textAlign:"center"}} className="par">
        <div style={{ display: "flex" }}>
          <h1>Participants</h1>
        </div>
        <div>
          {clicked.map((el, index) => <Particpant key={index} />)}

        </div>
      </div>
      <div className="t" style={{ width: "300px", marginLeft: "40px" }}>
        <div style={{ display: "flex" }}>
          <h1>Current Time</h1>
        </div>
        <div>
          {clicked.map((el, index) => <div className="country"> {addHoursToDate(myDate,el.split("/")[1]*1)}</div>)}
        </div>
      </div>
      <div className="t" style={{ width: "250px", marginLeft: "40px", }}>
        <div style={{ display: "flex" }}>
          <h1>Options</h1>
        </div>
        {(clicked.length > 2) && <>
          <div className="participant">
            <input type="checkbox" id="working" name="working" />
            <label for="working">Working hours only</label>
          </div>
          <div className="participant">
            <input type="checkbox" id="working" name="working" />
            <label for="working">1 hour lunch break</label>
          </div>
          <div className="participant">
            <input type="checkbox" id="working" name="working" checked />
            <label for="working">meetings during Weekends </label>
          </div>
        </>
        }

      </div>
      <div className="button">
      Schedule Meetings Across these Time Zones
      </div>
      <div className="hours" style={{position : "relative"}}>
        <p className="midnight">Midnight</p>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div><p className="4am">4AM</p></div>
        <div></div>
        <div></div>
        <div></div>
        <div><p className="4am">8AM</p></div>
        <div></div>
        <div></div>
        <div></div>
        <div><p className="midday" >Midday</p></div>
        <div></div>
        <div></div>
        <div></div>
        <div><p className="4am">4AM</p></div>
        <div></div>
        <div></div>
        <div></div>
        <div><p className="4am">4AM</p></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>


  </>
  );
};

export default memo(MapChart);


const Particpant = ({ index }) => {
  const [participant, setparticipant] = useState(1)
  return (
    <div className="participant" key={index} >
      <img src={p} style={{ width: "30px" }} alt="img" />
      <div style={{ marginLeft: "6px" }}>
        X {participant}
      </div>
      <div style={{ display: "flex", marginLeft: "15px", fontSize: "20px" }}>
        <div style={{ border: "solid 1px", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={() => { setparticipant(participant => participant + 1) }}
        >+</div>
        <div style={{ border: "solid 1px", width: "25px", height: "25px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onClick={() => { if (participant > 1) setparticipant(participant => participant - 1) }}
        >-</div>

      </div>
    </div>)
}

