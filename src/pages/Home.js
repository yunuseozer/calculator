import Switch from '../customAssets/Switch'
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Dropdown from '../customAssets/Dropdown';
import Tooltip from '../customAssets/Tooltip';
import _ from "lodash";


// <h2> What percentage was purcahsed through a clean energy program? </h2>
//<div className="row-wrapper">
//<div className="left-home-input">
//  <p>Percentage</p>
 // <input className="text-input" placeholder = "0" type="number" id="fname" name="fname"  onChange={e => changeCleanPercent(e.target.value)} onWheel={(e) => e.target.blur()}/>
//</div>
//</div>*/

const Home = ({setinputObject, input, APIgrab, defaultObject, baseline}) => {


  const [animation, setAnimation] = useState("animation");
  const [homeToggle, setHomeToggle] = useState(true)
  const [yscroll, setYscroll] = useState(0);
  const [newinputobject, setnewinputobject] = useState({...input}); 


  useEffect(() => {
    return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
  }, []);

  useEffect(() => {
    if (!homeToggle){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_naturalgas_type'] = 1
      newinputobject['input_footprint_housing_heatingoil_type'] = 1
    } else {
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_naturalgas_type'] = 0
      newinputobject['input_footprint_housing_heatingoil_type'] = 0
    }
  }, [homeToggle]);
  

  useEffect(() => {
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
      setAnimation("animation-2")
    }, delayInMilliseconds);    }
 , [animation]);
 useLayoutEffect(() => {
  window.scrollTo(0, yscroll);
});


 function setInputNew() {
    setinputObject(newinputobject);
    setYscroll(window.scrollY)
    APIgrab()
}

    return (
      <div id={animation}>
        <div style={{display:'flex', justifyContent:'center', width:'100%', height:'120px'}}>
         <Switch toggler={setHomeToggle} toggle={homeToggle}></Switch>  
         </div>
         {homeToggle ? <HomeSimple setinputObject={setinputObject} newinputobject={newinputobject} setInputNew={setInputNew} defaultObject={defaultObject} baseline={baseline}></HomeSimple> : <HomeAdvanced setinputObject={setinputObject} newinputobject={newinputobject} baseline={baseline} defaultObject={defaultObject} setInputNew={setInputNew}></HomeAdvanced>}     
       </div>
    );
}


export default Home;



function HomeSimple({setinputObject, newinputobject, setInputNew, defaultObject, baseline}) {

  const [freq1, setfreq1] = useState("$/YEAR")
  const [water1, setWater1] = useState("")
  const [elec1, setElec1] = useState(defaultObject["input_footprint_housing_electricity_dollars"])
  
  function changeElec(newval) {
    console.log(1)
    
    if (freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = newval
    } else if (freq1 == "$/MONTH") {
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = newval
    } else if (freq1 == "kWh/YEAR") {
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = newval
    } else if (freq1 == "kWh/MONTH") {
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = newval
    } 
    if (newval == "") {
      newinputobject['input_footprint_housing_electricity_dollars'] = elec1
    }
    console.log(freq1)
    setInputNew()
  }

  function changeSpace(newval) {
    console.log(2)

    newinputobject['input_footprint_housing_squarefeet'] = newval
    if (newval == "") {
      newinputobject['input_footprint_housing_squarefeet'] = defaultObject['input_footprint_housing_squarefeet']
    }
    setInputNew()
  }

  function changeWater(newval) {
    console.log(3)

    setWater1(newval)
    newinputobject['input_footprint_housing_watersewage'] = newval
    setInputNew()
  }

  function changeFreq(newval) {

    console.log(4)
    let curr = newinputobject['input_footprint_housing_electricity_dollars']
    if (newval == "$/MONTH" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr * 12
    }
    if (newval == "$/YEAR" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr / 12
    }
    if (newval == "kWh/YEAR" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr / 12    
    }
    if (newval == "kWh/MONTH" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr * 12 
    }
    if (newval == "kWh/YEAR" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr 
    }
    if (newval == "$/YEAR" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr 
    }
    if (newval == "kWh/MONTH" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr * 12
    }
    if (newval == "$/YEAR" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr / 12
    }
    if (newval == "kWh/MONTH" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr 
    }
    if (newval == "$/MONTH" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr 
    }
    if (newval == "kWh/YEAR" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr / 12
    }
    if (newval == "$/MONTH" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr * 12
    }
    setfreq1(newval)
    setInputNew()
  }


  return (
  <div >
    <div className="outer-question">
      <div className="row-wrapper">
      <div className='tooltip-row'>
        <h2>How much do you spend on electricity?</h2>
        <Tooltip text={"To calculate your total electricity usage or costs, review your monthly electricity bills. Each bill will tell you how many kilowatt hours you have used in the month at what cost."}></Tooltip>
      </div>
      </div>
      <div className="row-wrapper">
        <div className="left-home-input">
          <p>Amount</p>
          <input className="text-input"  placeholder = {defaultObject["input_footprint_housing_electricity_dollars"]} type="number" id="fname" name="fname" onChange={e => changeElec(e.target.value)} onWheel={(e) => e.target.blur()}/>
        </div>
        <div className="right-home-input">
          <p>Frequency</p>
          <Dropdown
            placeholder={"$/YEAR"} 
            options={["$/YEAR", "$/MONTH", "kWh/YEAR", "kWh/MONTH"]}
            value={freq1}
            onChange={u => changeFreq(u)}>
          </Dropdown>
        </div>
      </div>
    </div>
    <hr style={{width:"100%", marginBottom:"2rem"}}></hr>

    <div className="outer-question">
    <div className='tooltip-row'>
        <h2> What is your household water consumption? </h2>
          <Tooltip text={"Average household water consumption: 242 liters/day \n 1-person household: 148 liters/day \n 2-person household: 242 liters/day \n 3-person household: 261 liters/day \n 4-person household: 299 literes/day \n 5-person household: 337 liters/day"}></Tooltip>
      </div>
        <div className="row-wrapper">
        <div className="left-home-input">
        <p>Liter Per Day</p>
          <Dropdown
            placeholder={"148 L (AVERAGE FOR 1 PERSON HOUSEHOLD)"} 
            options={["148", "242", "261", "299", "337"]}
            value={water1}
            onChange={w => changeWater(w)}>
          </Dropdown>
        </div>
      </div>
    </div>
    <hr style={{width:"100%", marginBottom:"2rem"}}></hr>
    <div className="outer-question">
      <div className='tooltip-row'>
        <h2>How large is your living space?</h2>
        <Tooltip text={"For a house, measure the length of a house and multiply it by the width of the house. If you have two stories, multiply by two. For an apartment or condo, first determine the area of each room by multiplying the length and width of each room. Add up the total area measurements for each room. This will give you the total area of your living space, all rooms combined."}></Tooltip>
      </div>      
      <div className="row-wrapper">
        <div className="left-home-input">
        <p>Total Square Footage</p>
        <input className="text-input" placeholder = {defaultObject["input_footprint_housing_squarefeet"]} type="number" id="fname" name="fname" onChange={e => changeSpace(e.target.value)} onWheel={(e) => e.target.blur()}/>
        </div>
      </div>
    </div>
  </div>
  )
}


function HomeAdvanced({setinputObject, newinputobject, defaultObject, setInputNew}) {


  const [freq2_1, setFreq2_1] = useState("")
  const [freq2_2, setFreq2_2] = useState("$/YEAR")
  const [freq2_3, setFreq2_3] = useState("")
  const [water2, setWater2] = useState("")
  const [freq1, setfreq1] = useState("$/YEAR")
  const [water1, setWater1] = useState("")
  const [elec1, setElec1] = useState(defaultObject["input_footprint_housing_electricity_dollars"])
  
  function changeElec(newval) {
    console.log(1)
    
    if (freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = newval
    } else if (freq1 == "$/MONTH") {
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = newval
    } else if (freq1 == "kWh/YEAR") {
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = newval
    } else if (freq1 == "kWh/MONTH") {
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = newval
    } 
    if (newval == "") {
      newinputobject['input_footprint_housing_electricity_dollars'] = elec1
    }
    console.log(freq1)
    setInputNew()
  }
  function changeFreq(newval) {
    console.log(2)
    let curr = newinputobject['input_footprint_housing_electricity_dollars']
    if (newval == "$/MONTH" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr * 12
    }
    if (newval == "$/YEAR" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr / 12
    }
    if (newval == "kWh/YEAR" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr / 12    
    }
    if (newval == "kWh/MONTH" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr * 12 
    }
    if (newval == "kWh/YEAR" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr 
    }
    if (newval == "$/YEAR" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr 
    }
    if (newval == "kWh/MONTH" && freq1 == "$/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr * 12
    }
    if (newval == "$/YEAR" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr / 12
    }
    if (newval == "kWh/MONTH" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr 
    }
    if (newval == "$/MONTH" && freq1 == "kWh/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr 
    }
    if (newval == "kWh/YEAR" && freq1 == "$/MONTH"){
      newinputobject['input_footprint_housing_electricity_type'] = 1
      newinputobject['input_footprint_housing_electricity_kwh'] = curr / 12
    }
    if (newval == "$/MONTH" && freq1 == "kWh/YEAR"){
      newinputobject['input_footprint_housing_electricity_type'] = 0
      newinputobject['input_footprint_housing_electricity_dollars'] = curr * 12
    }
    setfreq1(newval)
    setInputNew()
  }

  function changeNatGas(newval) {
    console.log(3)

    if (freq2_2 == "$/YEAR"){
      newinputobject['input_footprint_housing_naturalgas_type'] = 0
      newinputobject['input_footprint_housing_naturalgas_dollars'] = newval

    } else if (freq2_2 == "$/MONTH") {
      newinputobject['input_footprint_housing_naturalgas_type'] = 0
      newinputobject['input_footprint_housing_naturalgas_dollars'] = newval

    } else if (freq2_2 == "ft^3/YEAR") {
      newinputobject['input_footprint_housing_naturalgas_type'] = 2
      newinputobject['input_footprint_housing_naturalgas_cuft'] = newval
    } else if (freq2_2 == "ft^3/MONTH") {
      newinputobject['input_footprint_housing_naturalgas_type'] = 2
      newinputobject['input_footprint_housing_naturalgas_cuft'] = newval
    } 
    if (newval == "") {
      console.log(defaultObject["input_footprint_housing_naturalgas_dollars"])
      newinputobject['input_footprint_housing_electricity_dollars'] = defaultObject["input_footprint_housing_naturalgas_dollars"]
    }
    setInputNew()
  }

  function changeNatOther(newval) {
    console.log(4)

    if (freq2_3 !== "PER YEAR" && typeof freq2_3 !== ''){
      newinputobject['input_footprint_housing_heatingoil_dollars'] = newval * freq2_3
    } else {
      newinputobject['input_footprint_housing_heatingoil_dollars'] = newval 
    }
  }

  function changeSpace(newval) {
    console.log(5)

    newinputobject['input_footprint_housing_squarefeet'] = newval
  }

  function changeCleanPercent(newval) {
    newinputobject['input_footprint_housing_cleanpercent'] = newval
  }

  function changeWater(newval) {
    console.log(6)

    setWater2(newval)
    newinputobject['input_footprint_housing_watersewage'] = newval
  }

  function changeFreq2_1(newval) {
    console.log(7)

    setFreq2_1(newval)
    let curr = newinputobject['input_footprint_housing_electricity_dollars']
    if (newval == "PER MONTH"){
        newinputobject['input_footprint_housing_electricity_dollars'] = curr * 12
    }
    if (newval == "PER WEEK"){
        newinputobject['input_footprint_housing_electricity_dollars'] = curr * 52
    }
    if (newval == "PER DAY"){
        newinputobject['input_footprint_housing_electricity_dollars'] = curr * 365
    }
  }

  function changeFreq2_2(newval) {
    console.log(8)

    setFreq2_2(newval)
    let curr = newinputobject['input_footprint_housing_naturalgas_dollars']
    if (newval == "PER MONTH"){
        newinputobject['input_footprint_housing_naturalgas_dollars'] = curr * 12
    }
    if (newval == "PER WEEK"){
        newinputobject['input_footprint_housing_naturalgas_dollars'] = curr * 52
    }
    if (newval == "PER DAY"){
        newinputobject['input_footprint_housing_naturalgas_dollars'] = curr * 365
    }
  }

  function changeFreq2_3(newval) {
    console.log(9)

    setFreq2_3(newval)
    let curr = newinputobject['input_footprint_housing_heatingoil_dollars']
    if (newval == "PER MONTH"){
        newinputobject['input_footprint_housing_heatingoil_dollars'] = curr * 12
    }
    if (newval == "PER WEEK"){
        newinputobject['input_footprint_housing_heatingoil_dollars'] = curr * 52
    }
    if (newval == "PER DAY"){
        newinputobject['input_footprint_housing_heatingoil_dollars'] = curr * 365
    }
  }

  return (
  <div>
    <div className="outer-question">
      <div className="row-wrapper">
      <div className='tooltip-row'>
        <h2>How much do you spend on electricity?</h2>
        <Tooltip text={"To calculate your total electricity usage or costs, review your monthly electricity bills. Each bill will tell you how many kilowatt hours you have used in the month at what cost."}></Tooltip>
      </div>
      </div>
      <div className="row-wrapper">
        <div className="left-home-input">
          <p>Amount</p>
          <input className="text-input"  placeholder = {defaultObject["input_footprint_housing_electricity_dollars"]} type="number" id="fname" name="fname" onChange={e => changeElec(e.target.value)} onWheel={(e) => e.target.blur()}/>
        </div>
        <div className="right-home-input">
          <p>Frequency</p>
          <Dropdown
            placeholder={"$/YEAR"} 
            options={["$/YEAR", "$/MONTH", "kWh/YEAR", "kWh/MONTH"]}
            value={freq1}
            onChange={u => changeFreq(u)}>
          </Dropdown>
        </div>
      </div>
    </div>
    <hr style={{width:"100%", marginBottom:"2rem"}}></hr>  
    <div className="outer-question">
     

    <div className="outer-question">
      <div className='tooltip-row'>
        <h2>How much do you spend on natural gas?</h2>
        <Tooltip text={"To calculate your total annual natural gas usage or costs, review your monthly utility bills. Each bill will tell you how many cubic metres you have used in the month at what cost."}></Tooltip>
      </div>
      <div className="row-wrapper">
        <div className="left-home-input">
          <p>Amount</p>
          <input className="text-input" placeholder = "0" type= "number" id="fname" name="fname" onChange={e => changeNatGas(e.target.value)} onWheel={(e) => e.target.blur()}/>
        </div>
        <div className="right-home-input">
          <p>Unit</p>
          <Dropdown
            placeholder={"$/YEAR"} 
            options={["$/YEAR", "$/MONTH", "ft^3/YEAR", "ft^3/MONTH"]}
            value={freq2_2}
            onChange={w => changeFreq2_2(w)}
            >
          </Dropdown>
        </div>
      </div>
    </div>

    <hr style={{width:"100%", marginBottom:"2rem"}}></hr>

<div className="outer-question">
  <div className='tooltip-row'>
    <h2>How much do you spend on heating oil and other fuels?</h2>
    <Tooltip text={"To calculate your total annual usage or cost of heating oil or other fuels to heat your home, review your monthly bills for heating oil or other home heating fuels. Each bill will tell you how many litres of oil were delivered to you each month at what cost."}></Tooltip>
  </div>
  <div className="row-wrapper">
    <div className="left-home-input">
      <p>Amount</p>
      <input className="text-input" placeholder = "200" type="number" id="fname" name="fname" onChange={e => changeNatOther(e.target.value)} onWheel={(e) => e.target.blur()}/>
    </div>
    <div className="right-home-input">
      <p>Unit</p>
      <Dropdown
        placeholder={"$/YEAR"} 
        options={["$/YEAR", "$/MONTH", "$/WEEK", "$/DAY"]}
        value={freq2_3}
        onChange={w => changeFreq2_3(w)}
        >
      </Dropdown>
    </div>
  </div>
  </div>

  <hr style={{width:"100%", marginBottom:"2rem"}}></hr>  
    <div className="outer-question">
      <div className='tooltip-row'>
        <h2> What is your household water consumption? </h2>
          <Tooltip text={"Average household water consumption: 242 liters/ day \n  1-person household: 148 liters/day \n 2-person household: 242 liters/day \n 3-person household: 261 liters/day \n 4-person household: 299 literes/day \n 5-person household: 337 liters/day"}></Tooltip>
      </div>
      <div className="row-wrapper">
        <div className="left-home-input">
          <p>Liters Per Day</p>
          <Dropdown
            placeholder={"148 L (AVERAGE FOR 1 PERSON HOUSEHOLD)"} 
            options={["148", "242", "261", "299", "337"]}
            value={water2}
            onChange={w => changeWater(w)}>
          </Dropdown>     
          </div>
      </div>
    </div>


    <hr style={{width:"100%", marginBottom:"2rem"}}></hr>
    <div className="outer-question">
      <div className='tooltip-row'>
        <h2>How large is your living space?</h2>
        <Tooltip text={"For a house, measure the length of a house and multiply it by the width of the house. If you have two stories, multiply by two. For an apartment or condo, first determine the area of each room by multiplying the length and width of each room. Add up the total area measurements for each room. This will give you the total area of your living space, all rooms combined."}></Tooltip>
      </div>
      <div className="row-wrapper">
        <div className="left-home-input">
        <p>Total Square Footage</p>
        <input className="text-input" placeholder = "1850" type="number" id="fname" name="fname" onChange={e => changeSpace(e.target.value)} onWheel={(e) => e.target.blur()}/>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}