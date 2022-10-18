import React, { memo, useEffect, useRef, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import "./style.css"
import p from "./assets/img_194962.png"
import ClockLoader from "react-spinners/ClockLoader";


const MapChart = ({ setTooltipContent, setWlc }) => {
  // itemsEls.current=[]
  let myDate = new Date();
  // var checked = false
  const monSet = new Set();
  const [clicked, setClicked] = useState([])
  const [loading, setloading] = useState(false)
  const [checked, setChecked] = useState(false)
  const [checked1, setChecked1] = useState(false)
  const [colors, setcolors] = useState([])
  const [maxindex, setmaxindex] = useState(-1)
  const [workingHoursOnly, setworkingHoursOnly] = useState(false)
  const t = [15, 9, 7, 2, 3, 12, 20, 40, 70, 90, 95, 90, 80, 85, 90, 87, 82, 80, 77, 75, 70, 69, 65, 60, 55]
  const [template, settemplate] = useState(t)
  var [result, setresult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [onlyWorktemplate, setowtemplate] = useState([5, 3, 3, 2, 1, 5, 6, 7, 90, 100, 100, 100, 90, 90, 90, 100, 100, 60, 40, 15, 10, 5, 3, 2])
  const [onlyWorktemplatewithLunch, setonlyWorktemplatewithLunch] = useState([5, 3, 3, 2, 1, 5, 6, 7, 90, 100, 100, 100, 0, 70, 90, 100, 100, 60, 40, 15, 10, 5, 3, 2])
  const refs = useRef([])
  useEffect(() => {
    let a = document.querySelector(".rsm-svg")
    a.setAttribute("viewBox", "25 80 800 600");

  }, [checked, maxindex, loading])
  let dispo = [];

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
                    // console.log(geo)
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
          {clicked.map((el, index) => <div className="country" key={index}>{el.split("/")[0]}  (UTC {(el.split("/")[1]) >= 0 ? "+" : ""}{el.split("/")[1]} )</div>)}

        </div>
      </div>
      <div style={{ width: "300px", marginLeft: "40px", textAlign: "center" }} className="par">
        <div style={{ display: "flex" }}>
          <h1>Participants</h1>
        </div>
        <div>

          {clicked.map((el, index) => {
            return <div ref={(element) => { refs.current[index] = element }} key={index}>
              <Particpant />
            </div>
          })}
        </div>
      </div>
      <div className="t" style={{ width: "300px", marginLeft: "40px" }}>
        <div style={{ display: "flex" }}>
          <h1>Current Time</h1>
        </div>
        <div>
          {clicked.map((el, index) => <div className="country" key={index}> {addHoursToDate(myDate, el.split("/")[1] * 1)}</div>)}
        </div>
      </div>
      <div className="t" style={{ width: "250px", marginLeft: "40px", }}>
        <div style={{ display: "flex" }}>
          <h1>Options</h1>
        </div>
        {(clicked.length > 2) && <>
          <div className="participant">
            <input type="checkbox" id="working" name="working"
              onChange={() => {
                console.log(refs)
                if (checked) settemplate(t)
                else if (!checked && checked1) settemplate(onlyWorktemplatewithLunch)
                else settemplate(onlyWorktemplate)
                setChecked(!checked)



              }
              }
            />
            <label for="working">Working hours only</label>
          </div>
          <div className="participant">
            <input type="checkbox" id="working" name="working"

              onChange={() => {


                if (!checked1 && checked) settemplate(onlyWorktemplatewithLunch)
                else if (checked1 && checked) settemplate(onlyWorktemplate)
                else settemplate(template)
                setChecked1(!checked1)


              }
              }
            />
            <label for="working">1 hour lunch break</label>
          </div>
          <div className="participant">
            <input type="checkbox" id="working" name="working" />
            <label for="working">meetings during Weekends </label>
          </div>
        </>
        }

      </div>
      <div className="loader" >
        <ClockLoader
          color="#d6d6da"
          loading={loading}
          size={66}
        />
        {!loading && <div className="button"
          onClick={() => {
            let maxIndex = -1
            result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            setloading(true);
            clicked.map((el, index) => {
              let tmp = [...template];
              tmp = rotate(tmp, el.split("/")[1] * 1)
              tmp.map((el, index) => {
                result[index] += el;
              })
              let max = 0
              for (let i = 0; i < result.length; ++i) {
                if (result[i] > max) { maxIndex = i; max = result[i] }
              }
              // console.log(result)
              // console.log(max, " index ", maxIndex)
              for (let i = 0; i < result.length; ++i) {
                if (result[i] == max) { dispo[i] = 8 }
                else if (result[i] > max * 7 / 8) { dispo[i] = 7 }
                else if (result[i] > max * 6 / 8) { dispo[i] = 6 }
                else if (result[i] > max * 5 / 8) { dispo[i] = 5 }
                else if (result[i] > max * 4 / 8) { dispo[i] = 4 }
                else if (result[i] > max * 3 / 8) { dispo[i] = 3 }
                else if (result[i] > max * 2 / 8) { dispo[i] = 2 }
                else if (result[i] > max * 1 / 8) { dispo[i] = 1 }
                else { dispo[i] = 0 }

              }
              // console.log(dispo[0])

            })
            setTimeout(() => {
              setmaxindex(maxIndex);
              setloading(false);
              setcolors(dispo)
            }, 2000);
          }}
        >
          Schedule Meetings Across these Time Zones
        </div>}
      </div>
      <div className="hours" style={{ position: "relative" }}>
        <p className="midnight">Midnight</p>
        <div className={` c${colors[0]} ${maxindex == 0 ? "best" : ""}`}></div>
        <div className={` c${colors[1]} ${maxindex == 1 ? "best" : ""}`}></div>
        <div className={` c${colors[2]} ${maxindex == 2 ? "best" : ""}`}></div>
        <div className={` c${colors[3]} ${maxindex == 3 ? "best" : ""}`}></div>
        <div className={` c${colors[4]} ${maxindex == 4 ? "best" : ""}`}><p className="4am">4AM</p></div>
        <div className={` c${colors[5]} ${maxindex == 5 ? "best" : ""}`}></div>
        <div className={` c${colors[6]} ${maxindex == 6 ? "best" : ""}`}></div>
        <div className={` c${colors[7]} ${maxindex == 7 ? "best" : ""}`}></div>
        <div className={` c${colors[8]} ${maxindex == 8 ? "best" : ""}`}><p className="4am">8AM</p></div>
        <div className={` c${colors[9]} ${maxindex == 9 ? "best" : ""}`}></div>
        <div className={` c${colors[10]} ${maxindex == 10 ? "best" : ""}`}></div>
        <div className={` c${colors[11]} ${maxindex == 11 ? "best" : ""}`}></div>
        <div className={` c${colors[12]} ${maxindex == 12 ? "best" : ""}`}><p className="midday" >Midday</p></div>
        <div className={` c${colors[13]} ${maxindex == 13 ? "best" : ""}`}></div>
        <div className={` c${colors[14]} ${maxindex == 14 ? "best" : ""}`}></div>
        <div className={` c${colors[15]} ${maxindex == 15 ? "best" : ""}`}></div>
        <div className={` c${colors[16]} ${maxindex == 16 ? "best" : ""}`}><p className="4am">4PM</p></div>
        <div className={` c${colors[17]} ${maxindex == 17 ? "best" : ""}`}></div>
        <div className={` c${colors[18]} ${maxindex == 18 ? "best" : ""}`}></div>
        <div className={` c${colors[19]} ${maxindex == 19 ? "best" : ""}`}></div>
        <div className={` c${colors[20]} ${maxindex == 20 ? "best" : ""}`}><p className="4am">8PM</p></div>
        <div className={` c${colors[21]} ${maxindex == 21 ? "best" : ""}`}></div>
        <div className={` c${colors[22]} ${maxindex == 22 ? "best" : ""}`}></div>
        <div className={` c${colors[23]} ${maxindex == 23 ? "best" : ""}`}></div>
      </div>
      {maxindex!=-1&&<div>
      the best time to Schedule a meeting is at {maxindex}:00 o'clock UTC
    </div>}
    <br/>
    <br/>
    <br/>
    <br/>
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


function rotate(arr, n) {
  if (n > 0)
    while (n--) {
      arr.push(arr.shift())
    }
  else {
    while (n++) {
      arr.unshift(arr.pop())
    }
  }
  return arr
}
function addHoursToDate(date, hours) {
  return <div>{new Date(new Date(date).setHours(date.getHours() + hours)).toLocaleString('en-US')}</div>
}