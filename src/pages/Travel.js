import React, { useState, useEffect, useLayoutEffect } from 'react';
import Dropdown from '../customAssets/Dropdown';
import trashicon from '../svgs/trash-347.svg';
import _ from "lodash";


const Travel = ({APIgrab, setinputObject, input, baseline, defaultObject}) => {

  const [animation, setAnimation] = useState("animation");
  const [vehicles, setVehicles] = useState([0]);
  const [count, setCount] = useState(1);
  const [newinputobject, setnewinputobject] = useState({...input}); 
  const [yscroll, setYscroll] = useState(0);


  let num_vehicles_default = 0;

  for (let i = 1; i <= 10; i++) {
    let query = "input_footprint_transportation_miles" + i;
    //console.log(query)
    if (defaultObject[query] == 0) {
      num_vehicles_default = i - 1;
      break;
    }    
  }
  //console.log(num_vehicles_default)

 /* useEffect(() => {
    APIgrab()
    return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
    
  }, []);*/

  function setInputNew() {
    setinputObject(newinputobject);
    setYscroll(window.scrollY)
    APIgrab()
  }
  
  
  useEffect(() => {
    setInputNew()
  }, []);
  console.log(input)


  useEffect(() => {
      var delayInMilliseconds = 100; //1 second
      setTimeout(function() {
        setAnimation("animation-2")
      }, delayInMilliseconds);    }
   , [animation]);

   useEffect(() => {
    if (count == 1 && num_vehicles_default != 1) {
      const a = [...Array(Math.max(num_vehicles_default, count)).keys()];
      setVehicles(a)
      setCount(Math.max(num_vehicles_default, count))
    }
   }, [vehicles, count]);

   useLayoutEffect(() => {
    window.scrollTo(0, yscroll);
  });

  function addVehicle() {
    setVehicles([...vehicles, String(count)])
    setCount(count + 1)
    newinputobject['input_footprint_transportation_num_vehicles'] = count + 1;
    setInputNew()
  }

  function removeVehicle(index) {
    const newVehicles = [...vehicles]; //duplicates the old list (because we don't want to modify state directly)
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
    setCount(count - 1)
    newinputobject['input_footprint_transportation_num_vehicles'] = count - 1;
    setInputNew()
  }

    
      return (
        <div className="travel-wrapper" id = {animation}>
          <h2>How do you get around?</h2>
          <h5 className="vehicle-sub-text">YOUR VEHICLES</h5>
          
              {vehicles.map((item, index) => <Vehicle key={item} index={index} removeVehicle={removeVehicle} newinputobject={newinputobject} setInputNew={setInputNew} baseline={baseline} defaultObject={defaultObject}></Vehicle>)}
          <button className="alternate-button" onClick={()=>addVehicle()}>+ ADD ANOTHER VEHICLE</button>
          <Plane defaultObject={defaultObject} newinputobject={newinputobject} setinputObject={setinputObject} setInputNew={setInputNew}></Plane>
          <p className="info-text">Note: Public transportation (e.g., bus, train) is assumed average for all users since its relative impact is small. </p>
        </div>
      );
    }


export default Travel;


function Vehicle ({index, removeVehicle, newinputobject, setInputNew, baseline, defaultObject}) {
  const [gas, setGas] = useState(undefined)
  const [freq, setFreq] = useState(undefined)
  const [miles, setMiles] = useState(newinputobject["input_footprint_transportation_miles" + String(index + 1)])
  const [mpg, setMpg] = useState('')


  const mpg_default = defaultObject['input_footprint_transportation_mpg1']

  let miles_default =   index == 0 ? defaultObject['input_footprint_transportation_miles1']:
                        index == 1 ? defaultObject['input_footprint_transportation_miles2']:
                        index == 2 ? defaultObject['input_footprint_transportation_miles3']:
                        index == 3 ? defaultObject['input_footprint_transportation_miles4']:
                        index == 4 ? defaultObject['input_footprint_transportation_miles5']:
                        index == 5 ? defaultObject['input_footprint_transportation_miles6']:
                        index == 6 ? defaultObject['input_footprint_transportation_miles7']:
                        index == 7 ? defaultObject['input_footprint_transportation_miles8']:
                        index == 8 ? defaultObject['input_footprint_transportation_miles9']:
                        index == 9 ? defaultObject['input_footprint_transportation_miles10']: 0



  if (freq == "PER MONTH"){
      miles_default = Math.round(miles_default / 12)
  }
  if (freq == "PER WEEK"){
      miles_default = Math.round(miles_default / 52)
  }
                        

 

  function changeType(param, newvalue, index) {
      setGas(newvalue)
      if (newvalue == "GAS"){
        newinputobject[param] = 1
        newinputobject["input_footprint_transportation_miles" + String(index + 1)] = miles
      } else{
        newinputobject[param] = 2
        newinputobject["input_footprint_transportation_miles" + String(index + 1)] = 0
      }
      setInputNew()

  }

  function changeMPG(param, newval) {
    setMpg(newval)
    newinputobject[param] = newval
    setInputNew()
  }

  function changeMiles(param, newval) {
    setMiles(newval)
    if (freq !== "PER YEAR" && typeof freq !== 'undefined'){
      newinputobject[param] = newval * freq
    } else {
      newinputobject[param] = newval 
    }
    setInputNew()
  }

  function changeFreq(param, newval) {
    setFreq(newval)
    let curr = newinputobject[param]
    if (newval == "PER MONTH" && freq == "PER YEAR"){
        newinputobject[param] = curr * 12
    }
    if (newval == "PER MONTH" && freq == "PER WEEK"){
      newinputobject[param] = (curr / 52) * 12
  }
    if (newval == "PER YEAR" && freq == "PER MONTH"){
      newinputobject[param] = curr / 12
  }
    if (newval == "PER WEEK" && freq == "PER YEAR"){
        newinputobject[param] = curr * 52
    }
    if (newval == "PER DAY" && freq == "PER YEAR"){
        newinputobject[param] = curr * 365
    }    
    if (newval == "PER MONTH" && freq == "PER DAY"){
      newinputobject[param] = (curr / 365) * 12 
    }
    if (newval == "PER DAY" && freq == "PER MONTH"){
      newinputobject[param] = (curr / 12) * 365
  }
    if (newval == "PER YEAR" && freq == "PER DAY"){
      newinputobject[param] = curr / 365
  }
    if (newval == "PER WEEK" && freq == "PER MONTH"){
      newinputobject[param] = (curr / 12) * 52
  }
    if (newval == "PER YEAR" && freq == "PER WEEK"){
      newinputobject[param] = curr / 52
  }
    if (newval == "PER DAY" && freq == "PER WEEK"){
      newinputobject[param] = (curr / 52) * 365
  }
    if (newval == "PER WEEK" && freq == "PER DAY"){
      newinputobject[param] = (curr / 365) * 52
    }
    setFreq(newval)
    setInputNew()

  }

  if (gas == "GAS") {

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
            onChange={g => changeType("input_footprint_transportation_fuel" + String(index + 1), g, index)}
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
                id="md" 
                onWheel={(e) => e.target.blur()}
                placeholder={miles_default}
                name="md"
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
  else {
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
          onChange={g => changeType("input_footprint_transportation_fuel" + String(index + 1), g, index)}
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
              id="md" 
              onWheel={(e) => e.target.blur()}
              placeholder={miles_default}
              name="md"
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
}

function Plane ({newinputobject, defaultObject, setInputNew}) {


    function changeFlight(param, newval){
        newinputobject["input_footprint_transportation_airtype"] = 1
        newinputobject[param] = newval
        setInputNew()
    }



  return (
      <div className="vehicle-box">
        <h2>Flights</h2>
        <form>
          <h3>Short one-way-flights &lt; 400 mi per year</h3>        
          <input className="text-input" type="number" id="shortfl" name="shortfl" onWheel={(e) => e.target.blur()} onInput={e => changeFlight("input_footprint_transportation_airshort", e.target.value)} placeholder={defaultObject["input_footprint_transportation_airshort"]} />
          <h3>Medium one-way flights 400-1500 mi per year</h3>        
          <input className="text-input" type="number" id="medfl" name="medfl" onWheel={(e) => e.target.blur()} onInput={e => changeFlight("input_footprint_transportation_airmedium", e.target.value)} placeholder={defaultObject["input_footprint_transportation_airmedium"]} />
          <h3>Long one-way flights 1500 - 3000 mi per year</h3>        
          <input className="text-input" type="number" id="longfl" name="longfl" onWheel={(e) => e.target.blur()}  onInput={e => changeFlight("input_footprint_transportation_airlong", e.target.value)} placeholder={defaultObject["input_footprint_transportation_airlong"]} />
          <h3>Extended one-way flights &gt; 3000 mi per year</h3>        
          <input className="text-input" type="number" id="extfl" name="extfl"onWheel={(e) => e.target.blur()}  onInput={e => changeFlight("input_footprint_transportation_airextended", e.target.value)} placeholder={defaultObject["input_footprint_transportation_airextended"]} />
        </form>
      </div>
  )
}

