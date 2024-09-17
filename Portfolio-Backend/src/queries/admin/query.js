 const {adminModel} = require('@models')
 const bcrypt = require('bcryptjs');
 const {queryExecuter} = require('@utils');
 const {dbResponseHandler} = require('@handlers');


 class AdminQuery {
     
       getOne = async() => {
        await adminModel();
        const query = 'SELECT * FROM admin';

        return dbResponseHandler(null, 200, 'getOne', query, null, adminModel())  
        
      } 
      auth = async(adminInfo) => {
            const result = await this.getOne();
            const password = result.data[0].password;
            const isMatching = bcrypt.compareSync(adminInfo.password, password); 
            if(isMatching){
              return this.getOne();
            }else{
              console.log('is there')
              return dbResponseHandler('Login Failed...', 401, 'login', null, null, false, adminModel());
            }
      } 
      addOne = async (adminInfo) => {
            // Validate adminInfo object
            if (!adminInfo || typeof adminInfo.password !== 'string' || typeof adminInfo.email !== 'string' || typeof adminInfo.username !== 'string') {
                return dbResponseHandler(`Invalid admin information provided`, 400, 'addOne', null, null, false, null);
            }
        
            const query = `INSERT INTO admin (password, email, username) values (?,?,?)`;
        
            try {
                const encryptedPassword = bcrypt.hashSync(adminInfo.password, 12);
                const params = [encryptedPassword, adminInfo.email, adminInfo.username];
        
                const isThere = await this.getOne();  // Ensure this returns a valid array
        
                if (Array.isArray(isThere) && isThere.length < 1) {
                    return dbResponseHandler(null, 201, 'addOne', query, params, true, adminModel());
                    // return this.getOne();
                  } else {
                    return dbResponseHandler(`You Cannot Add More!!`, 406, 'addOne', null, null, false, null);
                }
            } catch (err) {
                return dbResponseHandler(`Error occurred: ${err.message}`, 500, 'addOne', query, null, false, null);
            }
        };

       deleteAll = async() =>{
        const query = 'DELETE FROM admin';
        const result = await queryExecuter(query);
        console.log(query);
        
        return result;
       }
       deleteAdmin = async(id) =>{
        const query = 'DELETE FROM admin WHERE id=?';
        const param = [id];
        
        return dbResponseHandler(result, 200, 'deleteAll', query, param);
        
       }
       updateOne = async(adminId, adminInfo) =>{
            const result = await this.getOne();
            const password = result.data[0].password;
            const isMatching = bcrypt.compareSync(adminInfo.password, password); 
            
            const encryptedPassword =  isMatching ? adminInfo.password  : bcrypt.hashSync(adminInfo.password, 12);
            
                  const query = `UPDATE admin SET
                  name=?,     
                  surname=?,     
                  username=?,     
                  password=?,      
                  bornDate=?,      
                  email=?,     
                  phone=?,      
                  location=?,     
                  major=?,          
                  speciality=?,   
                  praise=?,  
                  socials=?,
                  file=?           
                  WHERE id=?`;
                  const params = [adminInfo.name, adminInfo.surname, adminInfo.username, encryptedPassword, adminInfo.bornDate, adminInfo.email, adminInfo.phone, adminInfo.location, adminInfo.major, adminInfo.speciality, adminInfo.praise, adminInfo.socials, adminInfo.file, adminId];
                  
                  const response = await dbResponseHandler(null, 201, "updateOne", query, params, adminModel());
                  console.log(response.status)
                  if(response.status){
                    return this.getOne();
                  }
                  return response;
      }
 }

 module.exports = AdminQuery;
