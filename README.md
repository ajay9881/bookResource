# bookResource
to clone the code https://github.com/ajay9881/bookResource.git
copy the above link 
steps
1) git clone https://github.com/ajay9881/bookResource.git
2) git cd bookResource
3) git checkout main
4) git pull origin main
5) npm install
6) npm start

once you successfully done with the above steps you can start accessing the apis

To access the api, Use postman app.

use this api to login 
method: Post
format: json
url: http://localhost:4102/api/customers/login
Payload: 
{
    "customerEmail": "test@test.com",
    "Password":"ii1afli6"
}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
after login it will generate Authorization token key

copy the token key to access the book resource APIS
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Book Resource Insert api
method: post
url: http://localhost:4102/api/book/addbook
format: form-data

field names
bookName - type text
author - type text
pages - type text
price - type text
bookImg - type file

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
get all lists api
method: get
url: http://localhost:4102/api/book/list?bookRefId=
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
get single list api
method: get
url: http://localhost:4102/api/book/list?bookRefId=6203fdd49c28b52de4b2a4c2

to fetch single record you need to pass bookRefId = _id of a perticular record
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Update record
method: put
url: http://localhost:4102/api/book/detailsUpdate
format: form-data

field names
bookRefId - text
bookName - type text
author - type text
pages - type text
price - type text
bookImg - type file
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Delete Record
method: DELETE
url: http://localhost:4102/api/book/detailsDelete?bookRefId=6203fdd49c28b52de4b2a4c2

to delete a record you need to pass bookRefId = _id of a perticular record
