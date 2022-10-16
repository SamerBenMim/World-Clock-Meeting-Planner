import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
  const monSet = new Set();
  const [clicked, setClicked] = useState([])
  useEffect(() => {
    let a=  document.querySelector(".rsm-svg")
    a.setAttribute("viewBox", "25 80 800 600"); 

  }, [])
  return (
    <div data-tip="">
      <ComposableMap >
        <ZoomableGroup  zoom={.85} minZoom={0.7}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  id = {geo.id} 
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    console.log(geo)
                    setTooltipContent(`${geo.properties.name} (UTC ${(geo.properties.time)>0?"+":""}${geo.properties.time})`);
                  }}
                  onClick={
                    ()=>{
                      if(clicked.includes(geo.id))  setClicked(clicked => clicked.filter(el=>el!=geo.id))
                      else setClicked(clicked => [...clicked, geo.id])
                      document.querySelector(`#${geo.id}`).setAttribute("style","fill:red ; outline: none;")
                    }
                  }
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {

                      fill: (clicked.includes(geo.id)) ?"red":"#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                      cursor:"pointer"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                      cursor:"pointer"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
