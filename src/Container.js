import {useState, useEffect} from 'react';
import Intro from './components/Introtext';
import CCGraph from './components/CCgraph';
import ResultChart from './components/ResultsChart';
import './Container.scss';
import exit from './svgs/close-x-10324.svg'
import * as APILib from '@coolclimate/calculator-api';
import CarbCacl from './components/CarbonCalculator';



let baseline_ready = false


//Container.js is the catch all for the codebase. This is where we commuincate with the API and set the pages of the calculator/ The Results offset.
//In Short Container.JS is the parent of all the subsequent React Components and is the single source of truth.

function Container() {

  //////////////////////////////////////////
  //              REACT HOOKS             //
  //////////////////////////////////////////

    const defaultval= 1



    const [page, setPage] = useState(0); // page is integer corresponding to page on calculator widget. eg 0=starting, 1=travel...etc
    const [graphDisplay, setGraphDisplay] = useState(false); //graphdisplay is a toggle to display overlay for results. false = NotDISPLAYED.
    //Following is default input format for API call
    var input = {
        input_location: null,
        input_location_mode: 1,
        input_size: null,
        input_income: null,
        input_population: 1,
        input_changed: 1,
        input_footprint_household_adults: 1,
        internal_state_abbreviation: defaultval,
        input_footprint_household_children: defaultval,
        input_footprint_transportation_num_vehicles: defaultval,
        input_footprint_transportation_miles1: defaultval,
        input_footprint_transportation_mpg1: defaultval,
        input_footprint_transportation_fuel1: 2,
        input_footprint_transportation_miles2: defaultval,
        input_footprint_transportation_mpg2: defaultval,
        input_footprint_transportation_fuel2: defaultval,
        input_footprint_transportation_miles3: defaultval,
        input_footprint_transportation_mpg3: defaultval,
        input_footprint_transportation_fuel3: defaultval,
        input_footprint_transportation_miles4: defaultval,
        input_footprint_transportation_mpg4: defaultval,
        input_footprint_transportation_fuel4: defaultval,
        input_footprint_transportation_miles5: defaultval,
        input_footprint_transportation_mpg5: defaultval,
        input_footprint_transportation_fuel5: defaultval,
        input_footprint_transportation_miles6: defaultval,
        input_footprint_transportation_mpg6: defaultval,
        input_footprint_transportation_fuel6: defaultval,
        input_footprint_transportation_miles7: defaultval,
        input_footprint_transportation_mpg7: defaultval,
        input_footprint_transportation_fuel7: defaultval,
        input_footprint_transportation_miles8: defaultval,
        input_footprint_transportation_mpg8: defaultval,
        input_footprint_transportation_fuel8: defaultval,
        input_footprint_transportation_miles9: defaultval,
        input_footprint_transportation_mpg9: defaultval,
        input_footprint_transportation_fuel9: defaultval,
        input_footprint_transportation_miles10: defaultval,
        input_footprint_transportation_mpg10: defaultval,
        input_footprint_transportation_fuel10: defaultval,
        input_footprint_transportation_groundtype: defaultval,
        input_footprint_transportation_publictrans: defaultval,
        input_footprint_transportation_bus: defaultval,
        input_footprint_transportation_transit: defaultval,
        input_footprint_transportation_commuter: defaultval,
        input_footprint_transportation_intercity: defaultval,
        input_footprint_transportation_airtype: 1,
        input_footprint_transportation_airtotal: defaultval,
        input_footprint_transportation_airshort: defaultval,
        input_footprint_transportation_airmedium: defaultval,
        input_footprint_transportation_airlong: defaultval,
        input_footprint_transportation_airextended: defaultval,
        input_footprint_housing_cdd: defaultval,
        input_footprint_housing_hdd: defaultval,
        input_footprint_housing_electricity_type: defaultval,
        input_footprint_housing_electricity_dollars: defaultval,
        input_footprint_housing_electricity_kwh: defaultval,
        input_footprint_housing_cleanpercent: defaultval,
        input_footprint_housing_naturalgas_type: defaultval,
        input_footprint_housing_naturalgas_dollars: defaultval,
        input_footprint_housing_naturalgas_therms: defaultval,
        input_footprint_housing_naturalgas_cuft: defaultval,
        input_footprint_housing_heatingoil_type: defaultval,
        input_footprint_housing_heatingoil_dollars: defaultval,
        input_footprint_housing_heatingoil_gallons: 12,
        input_footprint_housing_heatingoil_dollars_per_gallon: defaultval,
        input_footprint_housing_squarefeet: defaultval,
        input_footprint_housing_watersewage: defaultval,
        input_footprint_housing_gco2_per_kwh: defaultval,
        input_footprint_shopping_food_meatfisheggs_default: defaultval,
        input_footprint_shopping_food_meat_beefpork_default: defaultval,
        input_footprint_shopping_food_meat_poultry_default: defaultval,
        input_footprint_shopping_food_meat_fish_default: defaultval,
        input_footprint_shopping_food_meat_other_default: defaultval,
        input_footprint_shopping_food_dairy_default: defaultval,
        input_footprint_shopping_food_fruitvegetables_default: defaultval,
        input_footprint_shopping_food_cereals_default: defaultval,
        input_footprint_shopping_food_otherfood_default: defaultval,
        input_footprint_shopping_food_meattype: 0,
        input_footprint_shopping_food_meatfisheggs: defaultval,
        input_footprint_shopping_food_meat_beefpork: defaultval,
        input_footprint_shopping_food_meat_poultry: defaultval,
        input_footprint_shopping_food_meat_fish: defaultval,
        input_footprint_shopping_food_meat_other: defaultval,
        input_footprint_shopping_food_dairy: defaultval,
        input_footprint_shopping_food_fruitvegetables: defaultval,
        input_footprint_shopping_food_cereals: defaultval,
        input_footprint_shopping_food_otherfood: defaultval,
        input_footprint_shopping_goods_default_furnitureappliances: defaultval,
        input_footprint_shopping_goods_default_clothing: defaultval,
        input_footprint_shopping_goods_default_other_entertainment: defaultval,
        input_footprint_shopping_goods_default_other_office: defaultval,
        input_footprint_shopping_goods_default_other_personalcare: defaultval,
        input_footprint_shopping_goods_default_other_autoparts: defaultval,
        input_footprint_shopping_goods_default_other_medical: defaultval,
        input_footprint_shopping_goods_type: defaultval,
        input_footprint_shopping_goods_total: defaultval,
        input_footprint_shopping_goods_furnitureappliances: defaultval,
        input_footprint_shopping_goods_clothing: defaultval,
        input_footprint_shopping_goods_other_type: defaultval,
        input_footprint_shopping_goods_other_total: defaultval,
        input_footprint_shopping_goods_other_entertainment: defaultval,
        input_footprint_shopping_goods_other_office: defaultval,
        input_footprint_shopping_goods_other_personalcare: defaultval,
        input_footprint_shopping_goods_other_autoparts: defaultval,
        input_footprint_shopping_goods_other_medical: defaultval,
        input_footprint_shopping_services_type: defaultval,
        input_footprint_shopping_services_total: defaultval,
        input_footprint_shopping_services_healthcare: defaultval,
        input_footprint_shopping_services_education: defaultval,
        input_footprint_shopping_services_communications: defaultval,
        input_footprint_shopping_services_vehicleservices: defaultval,
        input_footprint_shopping_services_finance: defaultval,
        input_footprint_shopping_services_household: defaultval,
        input_footprint_shopping_services_charity: defaultval,
        input_footprint_shopping_services_miscservices: defaultval,
    }
    //React hooks for INPUT, RESULT from API and First result to be used as BASELINE
    const [inputObject, setinputObject] = useState(input); 
    const [resultObject, setresultObject] = useState({}); 
    const [baselineObject, setbaselineObject] = useState({}); 
    const [defaultObject, setdefaultObject] = useState({}); 



    // When inputObject is changed, update the API 
    useEffect(() => {
      APIgrab()
   }, [inputObject]);



  //////////////////////////////////////////
  //        JAVASCRIPT FUNCTIONS          //
  //////////////////////////////////////////



    //Advances to next page
    function nextPage() {
        setPage(page + 1)
        //window.scroll(0,0)
        APIgrab()
    }

    //Advances to last page
    function prevPage() {
    setPage(page - 1)
    //window.scroll(0,0)
    APIgrab()

    }

    //Function used for selecting page from topnavbar of calc.
    function selectPage(pageNum) {
        setPage(pageNum)
        //APIgrab()

    }

    //Toggles Graph Overlay for results
    function toggleGraph() {
        if (!graphDisplay) {
          document.body.style.overflow = "hidden";
        } else{
          document.body.style.overflow = "visible";
        }
        setGraphDisplay(!graphDisplay)
      }
    

    //Finds width for carbon calcualtor
    function findWidth(page) {
    if (page === 0){
        return ""
    }
    else if (page === 5){
        return "full-width"
    } else{
        return "updated-carb-calc"
    }
    }


      //Grabs from API
    function APIgrab() {
    /** Note From Yunhao(Cookie):
     * I've changed this to use the APILib
     * 
     * To be able to implement more input features, use APILib.COMPUTE_FOOTPRINT_API() instead of current class
     * But you need to use APILib.GET_DEFAULTS_AND_RESULTS_API() first to be able to get default inputs.
     * 
     * I wrapped up some parameters by parseInt because sometimes typescript runtime does type check, 
     * just now that during implemention its best to use appropriate type in the actual compnents, as
     * it tends to keep everything cleaner
     */
        if (Object.keys(baselineObject).length === 0) {  
          //console.log(inputObject)
            let APICaller = new APILib.GET_DEFAULTS_AND_RESULTS_API();
            //console.log(inputObject['input_size'])
            APICaller.callAPI({
                input_location_mode: inputObject['input_location_mode'],
                input_income: inputObject['input_income'],
                input_location: inputObject['input_location'],
                input_size: inputObject['input_size']
            }).then((returnVal) => {
                console.log(returnVal)
                setresultObject(returnVal)
                setbaselineObject(returnVal)
                setdefaultObject(returnVal)
                let newinputobject = JSON.parse(JSON.stringify(inputObject))
                for (const property in returnVal) {
                    if (property in newinputobject){
                        newinputobject[property] = returnVal[property]
                    }
                }

                setinputObject(newinputobject)
            });
        } else if( page !== 0) {
            //console.log(inputObject)
            let footprintAPICaller = new APILib.COMPUTE_FOOTPRINT_API();
            footprintAPICaller.callAPI(inputObject).then((returnVal) => {
                console.log(returnVal)
                console.log(inputObject)
                if (!baseline_ready) {
                  setbaselineObject(returnVal)
                  baseline_ready = true
                }
                setresultObject(returnVal)
            });
            
        }
    return true
  }

  return (
    <div className="container row-wrapper">
      {/* <ReactTooltip type='light' className='hahabank'/> */}

      <div className={graphDisplay ? "graph-display" : "none"}> 
        <div className="more-info-graph">
          <div className="exit-icon-container"  onClick={()=>toggleGraph()}>
            <img alt="" src={exit} className="exit-icon"/>
          </div>
          <ResultChart baseline={baselineObject} results={resultObject}></ResultChart>
        </div>
      </div>
      <div className="carb-calc" id={findWidth(page)}>
        <CarbCacl APIgrab={APIgrab} page={page} nextPage={nextPage} prevPage={prevPage} selectPage={selectPage} toggleGraph={toggleGraph} setinputObject={setinputObject} input={inputObject} baseline={baselineObject} results={resultObject} defaultObject={defaultObject}> 
        </CarbCacl>
      </div>
      <Intro page={page}></Intro> 
      <div className = "rightgraph-transition desktop" id={page !== 0 && page !== 5 ?  "" : "blank-display"}>
        <CCGraph toggleGraph={toggleGraph} baseline={baselineObject} results={resultObject} baseline_ready={baseline_ready}></CCGraph>
      </div>

    </div>
  );
}

export default Container;
