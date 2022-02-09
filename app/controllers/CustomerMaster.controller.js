const CustomerMasterModel = require("../models/CustomerMaster.model").CustomerMasterSchema;
const CustomerMasterService = require("../services/CustomerMaster.service");

const sha256 = require("sha256");
const genericHelper = require("../helpers/generic.helper");


///create Customer
exports.addCustomers = async (req, res) => {
  response = req.body;
  
  
  let tempPasscode = genericHelper.generateTempPasscode();
  try {
    var user = new CustomerMasterModel({
      firstName : response.firstName,
      lastName: response.lastName,
      customerEmail: response.customerEmail,
     
      Password: sha256(tempPasscode),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // console.log(user)
    await user
    .save()
    .then((userdata) => {
     let  md = {
        name : response.firstName +" "+response.lastName,
        email : response.customerEmail
      }
           
      console.log("cust add token",user.customerEmail)
        res.status(200).send({
          message: "Creation of User Success, your password ",tempPasscode,
          status: true,
        });
       
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving user.",
        });
      });

  } catch (err) {
    //console.log("error", err);
    res.status(500).send({ errorMessage: err.message });
  }


};

// user login
exports.userLogin = async (req, res) => {
  let email=  {customerEmail: req.body.customerEmail}
    console.log("user login email",email)
  try {
    let userExist = await CustomerMasterService.getCustomerValue(email);

    /**if err return the response */
    if (!userExist.status) { 
      return res.status(500).send({
        message: userExist.message,
        status: false
      });
    }
    /**if email not exist */
   
        // /**if password mismatch */
    if (userExist.data[0].Password !== sha256(req.body.Password)) {
        return res.status(403).send({
        message: "login Failed due to incorrect email or password",
        status: false,
      });
    }
   


    
    let response = {
      id: userExist.data[0]._id,
      email: userExist.data[0].customerEmail,
     userName: userExist.data[0].firstName,
     fullName: userExist.data[0].firstName + " " + userExist.data[0].lastName,
     Type: "Customer"
    };
    let tokensecret = {
      id: userExist.data[0]._id,
      email: userExist.data[0].customerEmail,
      fullname: userExist.data[0].firstName + " " + userExist.data[0].lastName,
      secret: "testing"
    }
    var token = await genericHelper.CreateJWT(tokensecret);
    return res.status(200).send({
      message: "Login Success",
      status: true,
      data:response,
      token:token.data
    });
  } catch (err) {
    res.status(500).send({ message: err.message, status: false, data: [] });
  }
};



