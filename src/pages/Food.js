import React, { useState, useEffect } from 'react';
import Slider from "../customAssets/Slider";
import Tooltip from '../customAssets/Tooltip';
import _ from "lodash";


const Food = ({setinputObject, input}) => {


  const [animation, setAnimation] = useState("animation");
  const [dairy, setDairy] = useState(0);
  const [meat, setMeat] = useState(0);
  const [fish, setFish] = useState(0);
  const [other, setOther] = useState(0);
  const [poultry, setPoultry] = useState(0);
  const [grains, setGrains] = useState(0);
  const [fruits, setFruits] = useState(0);
  const [drinks, setDrinks] = useState(0);

  const [newinputobject, setnewinputobject] = useState({...input}); 




  useEffect(() => {
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
      setAnimation("animation-2")
    }, delayInMilliseconds);    
    if (animation === "animation"){
    }
  }
 , [animation]);


    useEffect(() => {
        return () => _.isEqual(input, newinputobject) ? null : setinputObject(newinputobject)
    }, []);

    
    useEffect(() => {
        newinputobject["input_footprint_shopping_food_fruitvegetables"] = fruits * (542 / 2.4)
    }, [fruits]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_meat_fish"] = fish * (146 / 0.3)
    }, [fish]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_meat_poultry"] = poultry * (330 / 0.6)
    }, [poultry]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_meat_beefpork"] = meat * (494 / 0.9)
    }, [meat]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_meat_other"] = other * (116 / 0.2)
    }, [other]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_dairy"] = dairy * (572 / 2.4)
    }, [dairy]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_cereals"] = grains * (1338 / 4.4)
    }, [grains]);

    useEffect(() => {
        newinputobject["input_footprint_shopping_food_otherfood"] = drinks * (1472 / 1.5)
    }, [drinks]);





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
            val = {meat}
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
