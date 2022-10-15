import { click } from "@testing-library/user-event/dist/click";
import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const MapChart = ({ setTooltipContent }) => {
  const [clicked, setClicked] = useState([])
  useEffect(() => {
    let a=  document.querySelector(".rsm-svg")
    a.setAttribute("viewBox", "15 70 800 600"); 

  }, [])
  return (
    <div data-tip="">
      <ComposableMap >
        <ZoomableGroup  zoom={.9} minZoom={0.7}>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography 
                  id = {geo.id} 
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                  }}
                  onClick={
                    ()=>{
                      setClicked(clicked => [...clicked, geo.id])
                      document.querySelector(`#${geo.id}`).setAttribute("style","fill:yellow ; outline: none;")
                      console.log(clicked)
                    }
                  }
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      
                      fill: (clicked.includes(geo.id)==true) ?"red":"#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
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
