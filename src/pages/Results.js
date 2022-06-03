import ResultChart from "../components/ResultsChart"
import facebookicon from '../svgs/facebook.svg'
import twittericon from '../svgs/twitter.svg'



const Results = ({baseline, results}) => {


  let grandTotal = results['result_grand_total']
  let baselineTotal = baseline['result_grand_total']
  let allBaselineTotals = [baseline['result_transport_total'], baseline['result_food_total'], baseline['result_housing_total'], baseline['result_goods_total']]
  let allTotals = [results['result_transport_total'], results['result_food_total'], results['result_housing_total'], results['result_goods_total']]


  


  function findpercent(final, starting){
    window.scroll(0,0)
    return Math.abs(Math.round(((final - starting) / Math.abs(starting)) * 100))
  }

  function stringdisplay(final, starting){
    if (final <= starting) {
      return "BETTER THAN AVERAGE"
    } else {
      return "WORSE THAN AVERAGE"
    }
  }
    
    return (
      <div className="wrapper">
        <h2 style={{textAlign:"center"}}>You're done! Here are your results:</h2>
        <div className="row-to-col center" >
          <div className="result-box">
            <h4 style={{marginTop:"20px"}}>YOUR FOOTPRINT</h4>
            <h5 className="resultserif-font">{Math.round(grandTotal)}</h5>
            <p className="resultbottom-font">TONS CO2/YEAR</p>
          </div>
          <div className="result-box">
            <h4>HOW YOU COMPARE</h4>
            <h5 className="resultserif-font">{findpercent(grandTotal, baselineTotal)}%</h5>
            <p className="resultbottom-font"> {stringdisplay(grandTotal, baselineTotal)}</p>
          </div>
        </div>
        <div className="outerresult-box">
        <ResultChart baseline={baseline} results={results}></ResultChart>
        </div>
        <h2 style={{textAlign:"center"}}>Share your results with your network</h2>
        <div id="socialshare" className="row-to-col" style={{justifyContent:"center", alignItems:"center"}}>
            <button className="socialmedia-button" >
            <a href="https://twitter.com/intent/tweet?text=Hello%20world" style={{textDecoration:"none"}}>
              <div className="row-wrapper" style={{justifyContent:"center", width:"350px"}}>
                <img className="smicon" src={facebookicon}></img>
                <p>Share On Facebook</p>
              </div>
            </a>
            </button>
          <button className="socialmedia-button">
          <a href="https://twitter.com/intent/tweet?text=Hello%20world" style={{textDecoration:"none"}}>
            <div className="row-wrapper" style={{justifyContent:"center", width:"350px"}}>
              <img className="smicon" src={twittericon}></img>
              <p>Share On Twitter</p>
            </div>
            </a>
          </button>

        </div>

      </div>
    );
}


export default Results;