import React, { useState, useEffect } from 'react';
import Slider from '../customAssets/Slider';
import Switch from '../customAssets/Switch';
import _ from "lodash";



//Shopping Page for the Calculator. 
const Shopping = ({setinputObject, input}) => {

  const [animation, setAnimation] = useState("animation");
  const [shopToggle, setShopToggle] = useState(true)

  const [newinputobject, setnewinputobject] = useState({...input}); 

  useEffect(() => {
    return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
  }, []);
  console.log(input)

  useEffect(() => {
    if (!shopToggle){
      newinputobject['input_footprint_shopping_goods_type'] = 1
      newinputobject['input_footprint_shopping_goods_other_type'] = 1
      newinputobject['input_footprint_shopping_services_type'] = 1
    } else {
      newinputobject['input_footprint_shopping_goods_type'] = 0
      newinputobject['input_footprint_shopping_goods_other_type'] = 0
      newinputobject['input_footprint_shopping_services_type'] = 0
    }
  }, [shopToggle]);
  



  useEffect(() => {
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
      setAnimation("animation-2")
    }, delayInMilliseconds);    }
 , [animation]);
    
    return (
      <div className="shopping-wrapper" id={animation}>
         <Switch toggler={setShopToggle} toggle={shopToggle}></Switch>  
        {shopToggle ? <HomeSimple newinputobject={newinputobject}></HomeSimple> : <HomeAdvanced newinputobject={newinputobject}></HomeAdvanced> }
      </div>
    );
}


export default Shopping;


function HomeSimple({newinputobject}) {


  const [unit1, setUnit1] = useState(2600)
  const [unit2, setUnit2] = useState(660)
  const [unit3, setUnit3] = useState(214)

  useEffect(() => {
    newinputobject["input_footprint_shopping_goods_clothing"] = unit1
  }, [unit1]);

  useEffect(() => {
    newinputobject["input_footprint_shopping_services_household"] = unit2
  }, [unit2]);

  useEffect(() => {
    newinputobject["input_footprint_shopping_services_vehicleservices"] = unit3
  }, [unit3]);





  return (
    <div >
      <h2>In a given month, about how much do you spend on the following?</h2>
      <div style={{width:"100%"}}>
      <Slider
          unit={"/month"}
          avg={2600}
          title={"PERSONAL (CLOTHING,MEDICAL)"}
          setval={setUnit1}
          val = {unit1}
        ></Slider>
        <hr></hr>
        <Slider
          unit={"/month"}
          avg={660}
          title={"HOME (FURNITURE,TECHNOLOGY)"}
          setval={setUnit2}
          val = {unit2}
        ></Slider>
        <hr></hr>
        <Slider
          unit={"/month"}
          avg={214}
          title={"CAR"}
          setval={setUnit3}
          val = {unit3}>
          </Slider>
      </div>
    </div>
  );
}



function HomeAdvanced({newinputobject}) {


  function changeShop(param, newvalue) {
    newinputobject[param] = newvalue * 12
  }

  return (
    <div >
      <h2>In a given month, about how much do you spend on the following?</h2>
      <div className="outer-question">
        <h4>Personal</h4>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Clothing</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_goods_clothing', e.target.value)} placeholder = "464" type="text" id="fname" name="fname"/>
          </div>
          <div className ="col-wrapper half-width">
            <p>Medical</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_goods_other_medical', e.target.value)} placeholder = "1140" type="text" id="fname" name="fname"/>
          </div>
        </div>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Entertainment</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_goods_other_entertainment', e.target.value)} placeholder = "277" type="text" id="fname" name="fname"/>
          </div>
          <div className ="col-wrapper half-width">
            <p>Personal Care</p>
            <input className="text-input"onInput={e => changeShop('input_footprint_shopping_goods_other_personalcare', e.target.value)}  placeholder = "138" type="text" id="fname" name="fname"/>
          </div>
        </div>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Personal buisness and finance</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_services_finance', e.target.value)} placeholder = "450" type="text" id="fname" name="fname"/>
          </div>
          <div className ="col-wrapper half-width">
            <p>Organizations and Charity</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_services_charity', e.target.value)} placeholder = "131" type="text" id="fname" name="fname"/>
          </div>
        </div>
      </div>

      <div className="outer-question">
        <h4>Home</h4>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Furniture and Appliances</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_services_household', e.target.value)} placeholder = "464" type="text" id="fname" name="fname"/>
          </div>
          <div className ="col-wrapper half-width">
            <p>Technology</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_services_communications', e.target.value)} placeholder = "1140" type="text" id="fname" name="fname"/>
          </div>
        </div>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Office Supplies</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_goods_other_office', e.target.value)} placeholder = "277" type="text" id="fname" name="fname"/>
          </div>
        </div>
      </div>


      <div className="outer-question">
        <h4>Car</h4>
        <div className="row-wrapper">
          <div className ="col-wrapper half-width">
            <p>Auto Parts</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_goods_other_autoparts', e.target.value)} placeholder = "464" type="text" id="fname" name="fname"/>
          </div>
          <div className ="col-wrapper half-width">
            <p>Car Maintenance</p>
            <input className="text-input" onInput={e => changeShop('input_footprint_shopping_services_vehicleservices', e.target.value)} placeholder = "1140" type="text" id="fname" name="fname"/>
          </div>
        </div>
      </div>

    </div>
  );
}
