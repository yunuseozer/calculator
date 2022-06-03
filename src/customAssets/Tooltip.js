import React from 'react';
import questionicon from '../svgs/question.svg'

//Tooltip to dispaly floating text

const Tooltip  = ({text, start=false}) => {

    return (
        <div className='custom-toolip-wrapper'>
            <img style={start ? {marginBottom: "1rem"} : null}className="tooltip-hover" alt="" src={questionicon}/>
            <div className='custom-tooltip'>{text}</div> 
        </div>
    )
}

export default Tooltip;
