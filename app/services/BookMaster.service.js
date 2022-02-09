
const bookMasterModel = require("../models/bookMaster.model").bookMasterSchema;
module.exports = {
  
  getbookValue: async (findquery) => {
    try {
     // console.log(findquery);
      let result = await bookMasterModel.find(findquery);
      //console.log(result);

      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "faild to get result" };
    } catch (error) {
      return {
        status: false,
        message: `MongoError: ${error.message}`,
        data: [],
      };
    }
  },
 


  /////update Data of book
    updatebookDetails: async (constraints, update) => {
      try {
        let result = await bookMasterModel.findOneAndUpdate(constraints, update, {
          new: true,
        });
        if (result) {
          return { status: true, data: result, message: "ok" };
        }
        return { status: false, data: result, message: "faild to update" };
      } catch (error) {
        return {
          status: false,
          message: `MongoError: ${error.message}`,
          data: [],
        };
      }
    },
    updateManybookDetails: async (constraints, update) => {
      try {
        let result = await bookMasterModel.updateMany(constraints, update, {
          new: true,
        });
        if (result) {
          return { status: true, data: result, message: "ok" };
        }
        return { status: false, data: result, message: "faild to update" };
      } catch (error) {
        return {
          status: false,
          message: `MongoError: ${error.message}`,
          data: [],
        };
      }
    },


    
////////delete book
    deletebookDetails : async (findquery) => {
      try {
        let result = await bookMasterModel.findOneAndRemove(findquery);
        if (result) {
          return { status: true, data: result, message: "ok" };
        }
        return { status: false, data: result, message: "faild to delete" };
      } catch (error) {
        return {
          status: false,
          message: `MongoError: ${error.message}`,
          data: [],
        };
      }
    },
 

};


  
 