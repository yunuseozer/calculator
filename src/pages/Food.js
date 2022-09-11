 import React, { useState, useEffect, useLayoutEffect } from 'react';
import Slider from "../customAssets/Slider";
import Tooltip from '../customAssets/Tooltip';
import _ from "lodash";


const Food = ({APIgrab, setinputObject, input}) => {

  
  const [animation, setAnimation] = useState("animation");
  const [dairy, setDairy] = useState(0);
  const [r, setR] = useState(0);
  const [meat, setMeat] = useState(0);
  const [fish, setFish] = useState(0);
  const [other, setOther] = useState(0);
  const [poultry, setPoultry] = useState(0);
  const [grains, setGrains] = useState(0);
  const [yscroll, setYscroll] = useState(0);
  const [fruits, setFruits] = useState(0);
  const [drinks, setDrinks] = useState(0);
  const [newinputobject, setnewinputobject] = useState({...input}); 
  //console.log(newinputobject)

  useEffect(() => {
    return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
  }, []);

  useEffect(() => {
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
      setAnimation("animation-2")
    }, delayInMilliseconds);    
    if (animation === "animation"){
    }
  }
 , [animation]);

  useLayoutEffect(() => {
    window.scrollTo(0, yscroll);
  });

    

    

    function changeMeat(param, newval) {
        newinputobject[param] = Math.round(newval * (494 / 0.9))
        newinputobject["input_changed"] = 1
        newinputobject["input_footprint_shopping_food_meattype"] = 1
        
        setinputObject(newinputobject)
        setYscroll(window.scrollY)
        APIgrab()
    }

      return (
        <div className="travel-wrapper" id = {animation}>
          <div className='tooltip-row'>
            <h2>How much does the average person in your household eat?</h2>
            <Tooltip text={"Enter the daily diet of the average person in your household. For example, if three people eat a total of six servings per day, enter 2 servings per person (6 ÷ 3 = 2)."}></Tooltip>
          </div>
          <div>
          <Slider
            unit={"daily servings per person"}
            avg={0.9}
            title={"BEEF, PORK, LAMB, VEAL"}
            setval={setMeat}
            val = {Math.round(meat)}
            onChange = {m => changeMeat("input_footprint_shopping_food_meat_beefpork", m)}
          ></Slider>
          <hr></hr>
          <Slider
            unit={"daily servings per person"}
            avg={0.3}
            title={"FISH AND SEAFOOD"}
            setval={setFish}
            val = {fish}
          ></Slider>
          <hr></hr>
          <Slider
            unit={"daily servings per person"}
            avg={0.2}
            title={"OTHER MEAT AND MEAT ALTERNATIVES(PROCESSED MEAT, NUTS,ETC.)"}
            setval={setOther}
            val = {other}
          ></Slider>
          <hr></hr>
           <Slider
            unit={"daily servings per person"}
            avg={0.6}
            title={"POULTRY AND EGGS"}
            setval={setPoultry}
            val = {poultry}
          ></Slider>
           <hr></hr>
           <Slider
            unit={"daily servings per person"}
            avg={4.4}
            title={"GRAINS & BAKED GOODS"}
            setval={setGrains}
            val = {grains}
          ></Slider>
            <hr></hr>
           <Slider
            unit={"daily servings per person"}
            avg={2.4}
            title={"DAIRY"}
            setval={setDairy}
            val = {dairy}
          ></Slider>
            <hr></hr>
           <Slider
            unit={"daily servings per person"}
            avg={2.4}
            title={"FRUITS AND VEGATABLES"}
            setval={setFruits}
            val = {fruits}
          ></Slider>
          <hr></hr>
           <Slider
            unit={"daily servings per person"}
            avg={1.5}
            title={"DRINKS"}
            setval={setDrinks}
            val = {drinks}
          ></Slider>
          </div>
  
        </div>
      );
  }


export default Food;
