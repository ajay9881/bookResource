module.exports = {
 
   serverPort: process.env.PORT || 4102,
   serverHost: '192.168.1.7',

  dbUrl:
   "mongodb+srv://usera:y0hndrfCVwdwKldH@cluster0.poooh.mongodb.net/testing?",

  jwt: {
    TokenLife: 86400,
    secret: "Asset",
  },
 

};
