import React from 'react';

import UICard from './UICard';

var getCardUIByProps =  function(props)
{
	if( props.type == "nameonly") 
	{
		return <UICard value={props.value} />
	}

	return ""
}

function Card( props )
{
	return getCardUIByProps( props )
}



export default Card;