const mongoose = require("mongoose");
let Schema = mongoose.Schema;


const bookMasterSchema = mongoose.Schema({

  bookName : {type: String},
  author : {type: String},
  pages : {type: Number},
  price : {type: Number},
  bookImg: {type: String},
  createdAt: { type: Date, default: new Date() },
 
});

module.exports = {
    bookMasterSchema: mongoose.model("bookMasterModel", bookMasterSchema, "bookMaster"),
};
