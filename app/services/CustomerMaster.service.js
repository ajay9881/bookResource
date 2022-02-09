const CustomerMasterModel = require("../models/CustomerMaster.model").CustomerMasterSchema;

module.exports = {
  //Add Customers
  saveCustomerValue: async (payload) => {
    try {
      let CustomerPayloadObject = new CustomerMasterModel(payload);
      let result = await CustomerPayloadObject.save();
      if (result) {
        return { status: true, data: result, message: "ok" };
      }
      return { status: false, data: result, message: "faild to save" };
    } catch (error) {
      return { status: false, data: [], message: error.message };
    }
  },
///////Customer list
  getCustomerValue: async (findquery) => {
    try {
       console.log("find query cust",findquery);
      let result = await CustomerMasterModel.find(findquery);
      // console.log("find query cust result",result);
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
 


  /////update Data of customer
    updateCustomerDetails: async (constraints, update) => {
      //console.log(constraints);
      try {
        let result = await CustomerMasterModel.findOneAndUpdate(constraints, update, {
          new: true,
        });
        if (result) {
          return { status: true, data: result, message: "ok" };
        }
        return { status: false, data: result, message: "faild to update" };
      } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
          return {
            status: false,
            message: 'Mobile Number 1 Already Exist',
            data: [],
          };
        }else{
        return {
          status: false,
          message: `MongoError: ${error.message}`,
          data: [],
        };
      }
      }
    },


    
////////delete customer
    deleteCustomerDetails : async (findquery) => {
      try {
        let result = await CustomerMasterModel.findOneAndRemove(findquery);
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


  
 