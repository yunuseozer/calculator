//REACT COMPONENT FOR RIGHT GRAPH DISPLAY DURING UI RENDER


const CCGraph = ({toggleGraph, baseline, results, baseline_ready}) => {



    //////////////////////////////////////////
    //              ARGUEMENTS              //
    //////////////////////////////////////////    
  
    //----toggleGraph----
    //Togglegraph function passed in from grand all parent(container). 
    //Toggles extra graph display/overlay
  
  
    //----grandTotal----
    //grandTotal Carbon Footprint number from API call in container.js.
      let baselineTotal, grandTotal
      if (!baseline_ready) {
        baselineTotal = 0
        grandTotal = 0
      } else {
        baselineTotal = baseline['result_grand_total'] ? Math.round(baseline['result_grand_total']*100)/100 : 0
        grandTotal = results['result_grand_total'] ? Math.round(results['result_grand_total']*100)/100 : 0
      }

     // console.log(baseline['result_grand_total'])
     // console.log(results['result_grand_total'])


      
      function findpercent(final, starting){
        return Math.abs(Math.round(((final - starting) / Math.abs(starting)) * 100))
      }
    
      function stringdisplay(final, starting){
        if (final <= starting) {
          return String(findpercent(final, starting)) + "% better"
        } else {
          return String(findpercent(final, starting)) + "% worse"
        }
      }
    
      return (
          <div className="ccGraph">
            {grandTotal === baselineTotal ? <h3>To start, we use your household location, size and income to estimate your average carbon footprint.</h3> : <h3>So far your footprint is <b> {stringdisplay(grandTotal, baselineTotal)}</b> than average</h3> }
            <div className="desktop">
              <div className="row-wrapper graph-row">
                <SmallGraph type = {1} size = {Math.round(grandTotal)} mobile={false}></SmallGraph>
                <SmallGraph type = {0} size = {Math.round(baselineTotal)} mobile={false}></SmallGraph>
              </div>
              <p id="moredetails" className="link" onClick={()=>toggleGraph()}>View more details</p>
              <hr></hr>
              <p>Learn how you can <b className="link">take action </b></p> 
              <hr></hr>
            </div>
            <div className="mobile">
              <div className="col-wrapper graph-row">
                <SmallGraph type = {1} baseline={baselineTotal} size = {grandTotal} mobile={true}></SmallGraph>
                <SmallGraph type = {0} baseline={baselineTotal} size = {baselineTotal} mobile={true}></SmallGraph>
              </div>
              <p className="link" onClick={()=>toggleGraph()}>View more details</p>
              <section className="desktop">
                <hr></hr>
                <p id="takeaction">Learn how you can <b className="link">take action </b></p> 
                <hr></hr>
              </section>
            </div>
          </div>
          
      );
  
    }
    
  export default CCGraph
  
  
  //Small Graph function to render height responsive bar charts depending on Carbon Footprint
  function SmallGraph ({type, baseline, size, mobile}) {
  
    //////////////////////////////////////////
    //              ARGUEMENTS              //
    //////////////////////////////////////////    
  
    //----type----
    //Color of barchart
    //0: light-grey barchart
    //1: light-blue barchart
  
  
    //----size----
    //Height of barchart, should corrospond to carbon footprint.
  
  
    //----baseline----
    //Baseline carbon footprint calculated at start of API Call
  
    //----mobile----
    //boolean that lets app know how to display results
  
  
    //Functions to calculate width and height of CC bars
    const ratio = size/ baseline
    const augmentedheight = String(size * 2) + "px" //multilplied by 2 to make changes more noticable.
    const augmentedwidth = String(Math.round(ratio * 45)) + "vw" //multilplied by 2 to make changes more noticable.
  
  
    if (mobile){
        return(
          <div className="small-graph-wrapper">
          <h3> <b>{type ? "YOUR HOUSEHOLD" : "SIMILAR HOUSEHOLDS"}</b></h3>
          <div className={type ? "small-graph light-blue" : "small-graph light-grey"} style={{width: augmentedwidth}}>
          </div>
          <p>{size} tons CO2/year</p>
        </div>
        )
    } else {
      return(
        <div className="small-graph-wrapper">
          <div className={type ? "small-graph light-blue" : "small-graph light-grey"} style={{height: augmentedheight}}>
          </div>
          <p>{type ? "Your household" : "Similar Households"} </p>
          <h4 id="special-size">{size}</h4>
          <h4>TONS</h4>
          <h3>CO2EQ/YEAR</h3>
        </div>
      )
    }
  
  }