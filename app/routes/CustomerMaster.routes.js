const customerMasterCtrl = require("../controllers/CustomerMaster.controller");
var express = require("express");
var bodyParser = require("body-parser");
var customer = express.Router();

customer.use(bodyParser.json());

customer.route("/login").post(function (req, res, next) {
    customerMasterCtrl.userLogin(req, res, next);
});
customer.route("/customerAdd").post(function (req, res, next) {
    customerMasterCtrl.addCustomers(req, res, next);
});
customer.route("/registrationcust").post(function (req, res, next) {
    customerMasterCtrl.registrationcust(req, res, next);
});

customer.route("/customerList").get(function (req, res, next) {
    customerMasterCtrl.fetchCustomersList(req, res, next);
});
customer.route("/customerDetails").get(function (req, res, next) {
    customerMasterCtrl.fetchCustomerDetailById(req, res, next);
});
customer.route("/customerDetailsUpdate").put(function (req, res, next) {
    customerMasterCtrl.updateCustomerById(req, res, next);
});
customer.route("/customerDetailsdelete").delete(function (req, res, next) {
    customerMasterCtrl.DeleteCustomerById(req, res, next);
});
customer.route("/forgotpassword").post(function (req, res, next) {
    customerMasterCtrl.forgotpassword(req, res, next);
});

customer.route("/changepassword").post(function (req, res, next) {
    customerMasterCtrl.changepassword(req, res, next);
});
customer.route("/pagination").get(function (req, res, next) {
    customerMasterCtrl.pagination(req, res, next);
});
customer.route("/updateCustomerPermission").put(function (req, res, next) {
    customerMasterCtrl.updateCustomerPermission(req, res, next);
});

module.exports = customer;

