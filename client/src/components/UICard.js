import React from 'react';

function UICard( props )
{
	return ( 
			<div className="pmt_card--type1 font16 curP flex-column">
				<div className={`pmt_card--name flex${props.value[0]}`}>{props.value[0]}</div>
			 	<div className="bold">{props.value}</div>
		</div> )
}

export default UICard;