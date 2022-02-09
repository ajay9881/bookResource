const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const CustomerMasterSchema = mongoose.Schema({
  firstName : {type: String},
  lastName : {type: String},
  customerEmail : {type: String},
  userName: {type: String},
  mobileNumber1: {type: String, unique: true},
  mobileNumber2: {type: String},
  mobileNumber3: {type: String},
  mobileNumber4: {type: String},
  mobileNumber5: {type: String},
  addressLineOne : {type: String},
  addressLineTwo : {type: String},
  city : {type: String},
  state : {type: String},
  country : {type: String},
  pincode : {type: Number},
  Status : {type: String},
  userRole:{type:String},
  userPermission:[{type:String}],
  userRefId:{type:String},
  //isAdmin : {type:Boolean, default : false},
  //isCustomer :{type:Boolean, default : true},
  Password:{type:String},
  Image:{type:String},
  flag:{type:String},
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
});


module.exports = {
  CustomerMasterSchema: mongoose.model("CustomerMasterModel", CustomerMasterSchema, "CustomerMaster"),
};
