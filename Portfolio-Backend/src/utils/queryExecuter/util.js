const {executeQuery} = require('@db')

async function queryExecuter(query, params, model){
    console.log(model)
    await model;
    const result = await executeQuery(query, params);
    return result;
}

module.exports = queryExecuter;
