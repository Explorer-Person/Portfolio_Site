const {executeQuery} = require('@db')
const {skillsModel} = require('@models')

const {dbResponseHandler} = require('@handlers');

class SkillsQuery {

      getAll = async() => {
        const query = 'SELECT * FROM skills';
        return dbResponseHandler(null, 200, 'getAll', query, null, skillsModel());
      }
      getOne = async(id) => {
        const query = 'SELECT * FROM skills WHERE id=?';
        const param = [id];
        return dbResponseHandler(null, 200, 'getOne', query, param, skillsModel());
      }
      addOne = async(adminId, skillsInfo) =>{
        console.log(skillsInfo)
       const query = `INSERT INTO skills (title, level, imgUrl, url, file, fk)
       values (?,?,?,?,?,?)`;
      
       const params = [skillsInfo.title, skillsInfo.level, skillsInfo.imgUrl, skillsInfo.url, skillsInfo.file, adminId];
       
       const response = await dbResponseHandler(null, 201, 'addOne', query, params, skillsModel());
       if(response.status){
        return await this.getAll();
       }
       return response;

      }
      deleteAll = async() =>{
       const query = 'DELETE FROM skills';
       const result = await executeQuery(query);
       
       return result;
      }
      deleteOne = async(id) =>{
       const query = 'DELETE FROM skills WHERE id=?';
       const param = [id];

       const response = await dbResponseHandler(null, 201, 'deleteOne', query, param, skillsModel());
       
       if(response.status){
        return this.getAll();
       }
       return response
      }
      updateOne = async(id, skillsInfo) =>{
           const query = `UPDATE skills SET
           title=?,
           level=?,
           url=?,
           imgUrl=?,
           file=?           
           WHERE id=?`;
           const params = [skillsInfo.title, skillsInfo.level, skillsInfo.url, skillsInfo.imgUrl, skillsInfo.file, id];
       
           const response = await dbResponseHandler(null, 201, 'update', query, params, skillsModel());
           if(response.status){
            return this.getAll();
           }
           return response;
     } 
}

module.exports = SkillsQuery;
