const { executeQuery } = require("@db");
const { projectsModel } = require("@models");

const { dbResponseHandler } = require("@handlers");

class ProjectsQuery {
  constructor() {}

  getAll = async () => {
    const query = "SELECT * FROM projects";

    return dbResponseHandler(null, 200, "getAll", query, null, projectsModel());
  };
  getOne = async (id) => {
    await projectsModel();
    const query = "SELECT * FROM projects WHERE id=?";
    const param = [id];
    return dbResponseHandler(
      null,
      200,
      "getOne",
      query,
      param,
      projectsModel()
    );
  };
  addOne = async (skillId, projectsInfo) => {
    const query = `INSERT INTO projects (title, kinds, detail, url, imgUrl, videoUrl, file, fk)
        values (?,?,?,?,?,?,?,?)`;
    const params = [
      projectsInfo.title,
      projectsInfo.kinds,
      projectsInfo.detail,
      projectsInfo.url,
      projectsInfo.imgUrl,
      projectsInfo.videoUrl,
      projectsInfo.file,
      skillId,
    ];

    const response = await dbResponseHandler(
      null,
      201,
      "addOne",
      query,
      params,
      projectsModel()
    );
    if (response.status) {
      return await this.getAll();
    }
    return response;
  };
  deleteAll = async () => {
    const query = "DELETE FROM projects";
    const result = await executeQuery(query);
    console.log(query);

    return result;
  };
  deleteOne = async (id) => {
    const query = "DELETE FROM projects WHERE id=?";
    const param = [id];
    console.log(param);
    const response = dbResponseHandler(
      null,
      201,
      "deleteOne",
      query,
      param,
      projectsModel()
    );
    if(response.status){
      return this.getAll();
    }else{
      return dbResponseHandler(
        'Something Caught There...',
        201,
        "deleteOne",
        query,
        param,
        projectsModel()
      );
    }
  };
  updateOne = async (id, projectsInfo) => {
    const query = `UPDATE projects SET title =?, kinds =?, detail =?, url =?, imgUrl =?, videoUrl =?, file =? WHERE id =?`;
    const params = [
      projectsInfo.title,
      projectsInfo.kinds,
      projectsInfo.detail,
      projectsInfo.url,
      projectsInfo.imgUrl,
      projectsInfo.videoUrl,
      projectsInfo.file,
      id,
    ];
    const response = await dbResponseHandler(
      null,
      201,
      "updateOne",
      query,
      params,
      projectsModel()
    );
    if (response.status) {
      return this.getAll();
    }
    else{
      return dbResponseHandler(
        'Something Caught There...',
        201,
        "deleteOne",
        query,
        params,
        projectsModel()
      );
    }};
}

module.exports = ProjectsQuery;
