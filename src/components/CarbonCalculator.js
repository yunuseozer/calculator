import React from 'react';
import CCGraph from '../components/CCgraph';
import Start from '../pages/Start';
import Travel from '../pages/Travel';
import Home from '../pages/Home';
import Food from '../pages/Food';
import Shopping from '../pages/Shopping';
import Results from '../pages/Results';


//Carbon Calculator Wrappper to render different pages and handle page changes
//Also in charge of updating API Call whenever next button is clicked or navbar is clicked
const CarbCacl = ({APIgrab, page, prevPage, nextPage, selectPage, toggleGraph, setinputObject, baseline, input, results, defaultObject}) => {


  //////////////////////////////////////////
  //              ARGUEMENTS              //
  //////////////////////////////////////////    

  //----page----
  //Current page to pass in. State is held in Container.js (single source of truth) 


  //----nextPage----
  //Nextpage function passed in from parent that is called whenever you click nextpage button.


  //----prevPage----
  //PrevPage function passed in from parent that is called whenever you click prevPage button.

    
  //----selectPage----
  //selectPage function passed in from parent that is called whenever you click on navbar and upsates page with corrosponding click.

    
  //----funcs----
  //Functions to update container.js API Input states passed on to Carbon Calculator Pages.

    //console.log(input)
    //Pages to render based on index 
    const pages = [
    <Start APIgrab={APIgrab} nextPage={nextPage} setinputObject={setinputObject} input={input}></Start>,
    <Travel APIgrab={APIgrab} setinputObject={setinputObject} input={input} baseline={baseline} defaultObject={defaultObject}></Travel>, 
    <Home setinputObject={setinputObject} input={input} APIgrab={APIgrab} defaultObject={defaultObject} baseline={baseline}></Home>, 
    <Food APIgrab={APIgrab} setinputObject={setinputObject} input={input} defaultObject={defaultObject}></Food>, 
    <Shopping setinputObject={setinputObject} input={input}></Shopping>, 
    <Results baseline={baseline} results={results} ></Results>
    ]
  
      // Could condense baselinte total to just array access

  //////////////////////////////////////////
  //        HTML RENDER                   //
  //////////////////////////////////////////
    


  return (
    <div className="full-width">
      <div className={page === 0 ? "none" : "cc-header"}>
        <div id={page ? "" : "animation"}>
          <h1>Carbon Footprint Calculator</h1>
        </div>
        <div className="cc-navbar-wrapper">
          <div className="cc-navbar row-wrapper"> 
            <section id="travel" className = {page === 1 ? "sub-icon selected" : "sub-icon"} onClick={()=>selectPage(1)}> 
              <h4>TRAVEL</h4>
            </section>
            <section id="home" className = {page === 2 ? "sub-icon selected" : "sub-icon"} onClick={()=>selectPage(2)}> 
              <h4>HOME</h4>
            </section>
            <section id="food" className = {page === 3 ? "sub-icon selected" : "sub-icon"} onClick={()=>selectPage(3)}> 
              <h4>FOOD</h4>
            </section>
            <section id="shopping" className = {page === 4 ? "sub-icon selected" : "sub-icon"} onClick={()=>selectPage(4)}> 
              <h4>SHOPPING</h4>
            </section>
            <section id="results" className = {page === 5 ? "sub-icon selected" : "sub-icon"} onClick={()=>selectPage(5)}> 
              <h4>RESULTS</h4>
            </section>
          </div>
        </div>
      </div>
      <div className="carb-calc-wrapper">
        {pages[page]}
      </div>
      <div className={page !== 0 && page !== 5 ? 'mobile-wrapper' : 'none'}>
        <CCGraph toggleGraph={toggleGraph} baseline={baseline} results={results} ></CCGraph>
      </div>
      <hr id = {page !== 0 && page !== 5 ? "" : "none" }></hr>
      <div className="row-wrapper button-row" id = {page !== 0 && page !== 5 ? "" : "none" }>
        <button className="alternate-button" onClick={()=>prevPage()}>BACK</button>
        <button className="default-button" onClick={()=>nextPage()}>NEXT</button>
      </div>
    </div>
    );
  }


export default CarbCacl;
