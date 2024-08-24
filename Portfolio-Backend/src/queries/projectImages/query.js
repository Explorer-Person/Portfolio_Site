const { executeQuery } = require("@db");
const { projectImagesModel } = require("@models");

const { dbResponseHandler } = require("@handlers");

class ProjectImagesQuery {
  constructor() {}

  getAll = async () => {
    const query = "SELECT * FROM projectImages";

    return dbResponseHandler(null, 200, "getAll", query, null, projectImagesModel());
  };
  getOne = async (id) => {
    await projectImagesModel();
    const query = "SELECT * FROM projectImages WHERE id=?";
    const param = [id];
    return dbResponseHandler(
      null,
      200,
      "getOne",
      query,
      param,
      projectImagesModel()
    );
  };
  getSelected = async (fk) => {
    await projectImagesModel();
    const query = "SELECT * FROM projectImages WHERE fk=?";
    const param = [fk];
    return dbResponseHandler(
      null,
      200,
      "getSelected",
      query,
      param,
      projectImagesModel()
    );
  };
  addOne = async (projectId, data) => {
    const query = `INSERT INTO projectImages (url, file, fk)
        values (?,?,?)`;
    const params = [
      data.url,
      data.file,
      projectId,
    ];

    const response = await dbResponseHandler(
      null,
      201,
      "addOne",
      query,
      params,
      projectImagesModel()
    );
    if (response.status) {
      return await this.getAll();
    }
    return response;
  };
  deleteAll = async () => {
    const query = "DELETE FROM projectImages";
    const result = await executeQuery(query);
    console.log(query);

    return result;
  };
  deleteOne = async (id) => {
    const query = "DELETE FROM projectImages WHERE id=?";
    const param = [id];
    console.log(param);
    const response = await dbResponseHandler(
      null,
      201,
      "deleteOne",
      query,
      param,
      projectImagesModel()
    );
    if (response.status) {
      return this.getAll();
    }
    return response;
  };
  updateOne = async (id, projectImagesInfo) => {
    const query = `UPDATE projectImages SET url =?, file =? WHERE id =?`;
    const params = [
      projectImagesInfo.url,
      projectImagesInfo.file,
      id,
    ];
    const response = await dbResponseHandler(
      null,
      201,
      "updateOne",
      query,
      params,
      projectImagesModel()
    );
    if (response.status) {
      return this.getAll();
    }
    return response;
  };
}

module.exports = ProjectImagesQuery;
