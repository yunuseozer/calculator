import React, { useState, useEffect } from 'react';
import Dropdown from '../customAssets/Dropdown';
import trashicon from '../svgs/trash-347.svg';
import _ from "lodash";


const Travel = ({setinputObject, input, baseline, defaultObject}) => {

  const [animation, setAnimation] = useState("animation");
  const [vehicles, setVehicles] = useState([0]);
  const [count, setCount] = useState(1);
  const [newinputobject, setnewinputobject] = useState({...input}); 


  useEffect(() => {
    return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
  }, []);
  
  useEffect(() => {
      var delayInMilliseconds = 100; //1 second
      setTimeout(function() {
        setAnimation("animation-2")
      }, delayInMilliseconds);    }
   , [animation]);



  function addVehicle() {
    setVehicles([...vehicles, String(count)])
    setCount(count + 1)
    newinputobject['input_footprint_transportation_num_vehicles'] = count + 1;
  }

  function removeVehicle(index) {
    const newVehicles = [...vehicles]; //duplicates the old list (because we don't want to modify state directly)
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
    setCount(count - 1)
    newinputobject['input_footprint_transportation_num_vehicles'] = count - 1;
  }

    
      return (
        <div className="travel-wrapper" id = {animation}>
          <h2>How do you get around?</h2>
          <h5 className="vehicle-sub-text">YOUR VEHICLES</h5>
          {vehicles.map((item, index) => <Vehicle key={item} index={index} removeVehicle={removeVehicle} newinputobject={newinputobject} setinputObject={setinputObject} baseline={baseline} defaultObject={defaultObject}></Vehicle>)}
          <button className="alternate-button" onClick={()=>addVehicle()}>+ ADD ANOTHER VEHICLE</button>
          <Plane newinputobject={newinputobject} setinputObject={setinputObject}></Plane>
          <p className="info-text">Note: Public transportation (e.g., bus, train) is assumed average for all users since its relative impact is small. </p>
        </div>
      );
    }


export default Travel;


function Vehicle ({index, removeVehicle, newinputobject, setinputObject, baseline, defaultObject, miles_default}) {
  const [gas, setGas] = useState(undefined)
  const [freq, setFreq] = useState(undefined)
  const [miles, setMiles] = useState('')
  const [mpg, setMpg] = useState('')


  const mpg_default = defaultObject['input_footprint_transportation_mpg1']



  if (freq == "PER MONTH"){
      miles_default = Math.round(miles_default / 12)
  }
  if (freq == "PER WEEK"){
      miles_default = Math.round(miles_default / 52)
  }
                        



  function changeType(param, newvalue) {
      setGas(newvalue)
      if (newvalue == "GAS"){
        newinputobject[param] = 1
      } else{
        newinputobject[param] = 2
      }
  }

  function changeMPG(param, newval) {
    setMpg(newval)
    newinputobject[param] = newval
  }

  function changeMiles(param, newval) {
    setMiles(newval)
    if (freq !== "PER YEAR" && typeof freq !== 'undefined'){
      newinputobject[param] = newval * freq
    } else {
      newinputobject[param] = newval 
    }
  }

  function changeFreq(param, newval) {
    setFreq(newval)
    let curr = newinputobject[param]
    if (newval == "PER MONTH"){
        newinputobject[param] = curr * 12
    }
    if (newval == "PER WEEK"){
        newinputobject[param] = curr * 52
    }
    if (newval == "PER DAY"){
        newinputobject[param] = curr * 365
    }
  }



  return (
      <div className="vehicle-box">
        <div className="vehicle-delete-button"  onClick={()=>removeVehicle(index)}>
          <img alt = "" src={trashicon} className="trashicon" />
        </div>
        <h2>Vehicle {index + 1}</h2>
          <h3>Fuel Type</h3> 
          <Dropdown 
          placeholder={"GAS"} 
          options={["GAS", "ELECTRIC"]}
          value={gas}
          onChange={g => changeType("input_footprint_transportation_fuel" + String(index + 1), g)}
          > 
          </Dropdown>   
          <h3>Miles Per Gallon</h3>        
          <input 
            className="text-input" 
            type="number" 
            id="mpg" 
            onWheel={(e) => e.target.blur()}
            placeholder={mpg_default}
            name="mpg"
            value={mpg}
            onChange={e => changeMPG("input_footprint_transportation_mpg" + String(index + 1), e.target.value)}
            />
          <div className="row-wrapper input-row">
            <div className="half-width">
              <h3>Miles Driven</h3>        
              <input 
              className="text-input" 
              type="number" 
              onWheel={(e) => e.target.blur()}
              placeholder={miles_default}
              id="md" 
              name="md"
              value={miles}
              onChange={e => changeMiles("input_footprint_transportation_miles" + String(index + 1), e.target.value)}
              />
            </div>
            <div className="half-width">
              <h3>Frequency</h3>        
              <Dropdown 
              placeholder={"PER YEAR"} 
              options={["PER YEAR", "PER MONTH", "PER WEEK", "PER DAY"]}
              value={freq}
              onChange={f => changeFreq("input_footprint_transportation_miles" + String(index + 1), f)}
              ></Dropdown>       
            </div>
          </div>
      </div>
  )
}

function Plane ({newinputobject}) {


    function changeFlight(param, newval){
    
        newinputobject[param] = newval
    }



  return (
      <div className="vehicle-box">
        <h2>Flights</h2>
        <form>
          <h3>Short one-way-flights &lt; 400 mi per year</h3>        
          <input className="text-input" type="number" id="shortfl" name="shortfl" onWheel={(e) => e.target.blur()} onInput={e => changeFlight("input_footprint_transportation_airshort", e.target.value)} />
          <h3>Medium one-way flights 400-1500 mi per year</h3>        
          <input className="text-input" type="number" id="medfl" name="medfl" onWheel={(e) => e.target.blur()} onInput={e => changeFlight("input_footprint_transportation_airmedium", e.target.value)}  />
          <h3>Long one-way flights 1500 - 3000 mi per year</h3>        
          <input className="text-input" type="number" id="longfl" name="longfl" onWheel={(e) => e.target.blur()}  onInput={e => changeFlight("input_footprint_transportation_airlong", e.target.value)} />
          <h3>Extended one-way flights &gt; 3000 mi per year</h3>        
          <input className="text-input" type="number" id="extfl" name="extfl"onWheel={(e) => e.target.blur()}  onInput={e => changeFlight("input_footprint_transportation_airextended", e.target.value)} />
        </form>
      </div>
  )
}

