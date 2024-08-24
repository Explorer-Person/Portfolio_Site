const {queryExecuter} = require('@utils');

const dbResponseHandler = async(message, statusCode, process, query, params, model) =>{
    
          const response = await queryExecuter(query, params, model);
          const result = {
                process: process,
                status: !!response,
                statusCode: statusCode,
                data: !response ? message : response,
          }
          return result;

    
}

module.exports = dbResponseHandler;