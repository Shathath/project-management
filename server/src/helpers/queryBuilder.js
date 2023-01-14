function createUpdateQuery( tableProps )
{
    let { tableName, columns, whereClasueColumn } = tableProps;

    let values = [];

    let UPDATEQ = `UPDATE ${tableName} SET `;

    let setParams  = "";

    let tableColumnKeys = Object.keys( columns );

    tableColumnKeys.forEach((key, index) => 
    {
        setParams+=key+"= $"+(index+1)+" "

        if( tableColumnKeys.length-1 !== index ) 
        {
            setParams+=","
        }

        values.push( columns[key ] )
    }) 

    let WHERECLAUSE =" WHERE "+ whereClasueColumn +"= $"+(tableColumnKeys.length+1);

    let query = UPDATEQ + setParams + WHERECLAUSE;
    
    return { query , values  }
}


module.exports = 
{
    createUpdateQuery
}