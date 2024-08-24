const { executeQuery } = require("@db");
const {abilitiesModel} = require('@models');
const { dbResponseHandler } = require("@handlers");


class AbilitiesQuery {
  constructor() {}


  getAll = async () => {
    const query = "SELECT * FROM abilities";

    return dbResponseHandler(null, 200, "getAll", query, null, abilitiesModel());
  };
  getOne = async (id) => {
    const query = "SELECT * FROM abilities WHERE id=?";
    const param = [id]
    return dbResponseHandler(null, 200, "getOne", query, param, abilitiesModel());
  };
  addOne = async (adminId, abilitiesInfo) => {
    const query = `INSERT INTO abilities (title, level, fk)
            values (?,?,?)`;
    const params = [
      abilitiesInfo.title,
      abilitiesInfo.level,
      adminId,
    ];
    const response = await dbResponseHandler(
      null,
      201,
      "addOne",
      query,
      params,
      abilitiesModel()
    );
    if (response.status) {
      return await this.getAll();
    }
    return response;
  };
  deleteAll = async () => {
    const query = "DELETE FROM abilities";
    const result = await executeQuery(query);

    return result;
  };
  deleteOne = async (id) => {
    const query = "DELETE FROM abilities WHERE id=?";
    const param = [id];
    
    const response = await dbResponseHandler(null, 201, 'deleteOne', query, param, abilitiesModel());
    if(response.status){
     return this.getAll();
    }
    return response;
  };
  updateOne = async (id, abilitiesInfo) => {
    const query = `UPDATE abilities SET
                title=?, 
                level=?            
                WHERE id=?`;
    const params = [abilitiesInfo.title, abilitiesInfo.level, id];
       
    const response = await dbResponseHandler(null, 201, 'updateOne', query, params, abilitiesModel());
    if(response.status){
     return this.getAll();
    }
    return response;  
  };
}

module.exports = AbilitiesQuery;
