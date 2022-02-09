const bookMasterCtrl = require("../controllers/bookMaster.controller");
var express = require("express");
var bodyParser = require("body-parser");
var book = express.Router();
book.use(bodyParser.json());

book.route("/addbook").post(function (req, res, next) {
    bookMasterCtrl.addbook(req, res, next);
});
//fetch All books
book.route("/list").get(function (req, res, next) {
    bookMasterCtrl.fetchbookList(req, res, next);
});
//fetch book by id
book.route("/details").get(function (req, res, next) {
    bookMasterCtrl.fetchbookDetailById(req, res, next);
});

//update book by id
book.route("/detailsUpdate").put(function (req, res, next) {
    bookMasterCtrl.updatebookById(req, res, next);
});
//delete book by id
book.route("/detailsDelete").delete(function (req, res, next) {
    bookMasterCtrl.DeletebookById(req, res, next);
});
//pagination
book.route("/pagination").get(function (req, res, next) {
    bookMasterCtrl.pagination(req, res, next);
});

module.exports = book;
