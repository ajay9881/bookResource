const bookMasterModel = require("../models/bookMaster.model").bookMasterSchema;
const bookMasterService = require("../services/bookMaster.service");
var path = require("path");
var fs = require('fs');
//helper
const genericHelper = require("../helpers/generic.helper");
///create book
exports.addbook = async (req, res) => {

  try {

    if(!req.files){
      //validation
      return res.status(500).send({
        status: false,
        message: 'bookImg Field Cannot Be Empty',
      });
    }
    let bookImg = req.files.bookImg;
    response = { 
      bookName:req.body.bookName,
      author:req.body.author,
      pages:req.body.pages,
      price:req.body.price,
      bookImg: bookImg.name 
    }
    bookImg.mv("./bookImg/" + bookImg.name, function (err) {
      if (err) return res.status(500).send(err);
    });
    var book = new bookMasterModel(response);
    await book
      .save()
      .then((response) => {
        res.status(200).send({
          message: " Book Added Successfully",
          status: true,
        });
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message || "Some error occurred while adding.",
        });
      });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};

//Fetch bookList
exports.fetchbookList = async (req, res) => {
  let findquery = {};
  if (req.query.bookRefId) {
    findquery['_id'] =req.query.bookRefId;
  }
  try {
    let getbookList = await bookMasterService.getbookValue(findquery);
    if (!getbookList.status) {
      return res.status(500).send({
        status: false,
        message: getbookList.message,
        data: getbookList.data,
      });
    }
    // /**if data notfound */
    if (getbookList.status && getbookList.data.length == 0) {
      return res
        .status(200)
        .send({ status: false, message: "NotFound", data: getbookList.data });
    }
    // /**success response */
    return res.status(200).send({
      status: true,
      message: "bookList fetched successfully",
      data: getbookList.data,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: err.message });
  }
};

// ////update book details

exports.updatebookById = async (req, res) => {
  let findquery = {  };
 
  findquery['_id'] =req.body.bookRefId;
  if(!req.files){
    //validation
    return res.status(500).send({
      status: false,
      message: 'bookImg Field Cannot Be Empty',
     
    });
  }
  let getbookList = await bookMasterService.getbookValue(findquery);
  fs.unlink("./bookImg/" + getbookList.data[0].bookImg, function (err) {
    if (err) return res.status(500).send(err);
  });
//remove previous image
  

  
let bookImg = req.files.bookImg;
  response = { 
    bookName:req.body.bookName,
    author:req.body.author,
    pages:req.body.pages,
    price:req.body.price,
    bookImg: bookImg.name 
  }
  if(req.files){
  bookImg.mv("./bookImg/" + bookImg.name, function (err) {
    if (err) return res.status(500).send(err);
  });
}
//update new img
  try {
    let updatebookDetail = await bookMasterService.updatebookDetails(
      findquery,
      response
    );
   
    if (!updatebookDetail.status) {
      return res.status(500).send({
        status: false,
        message: updatebookDetail.message,
        data: updatebookDetail.data,
      });
    }

    // /**if data notfound */
    if (updatebookDetail.status && updatebookDetail.data.length == 0) {
      return res
        .status(200)
        .send({
          status: false,
          message: "NotFound",
          data: updatebookDetail.data,
        });
    }

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "updated successfully",
      data: updatebookDetail.data,
      length: updatebookDetail.data.length,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: err.message });
  }
};

///delete book
exports.DeletebookById = async (req, res) => {
  let findquery = {  };
 findquery['_id'] = req.query.bookRefId;
 
  try {
    let getbookList = await bookMasterService.getbookValue(findquery);
    fs.unlink("./bookImg/" + getbookList.data[0].bookImg, function (err) {
      if (err) return res.status(500).send(err);
    });

    let deletebookDetail = await bookMasterService.deletebookDetails(findquery);
    console.log("delete data of book ", deletebookDetail.data);
    if (!deletebookDetail.status) {
      return res.status(500).send({
        status: false,
        message: deletebookDetail.message,
        data: deletebookDetail.data,
      });
    }

    // /**if data notfound */
    if (deletebookDetail.status && deletebookDetail.data.length == 0) {
      return res
        .status(200)
        .send({
          status: false,
          message: "NotFound",
          data: deletebookDetail.data,
        });
    }

    // /**success response */
    return res.status(200).send({
      status: true,
      message: "book Delete Successfully",
      data: deletebookDetail.data,
      length: deletebookDetail.data.length,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: err.message });
  }
};
