# basic app

Some info about the APIs

3 APIs :

########## Public Endpoint ##########
  LOGIN 
  
  Request : {
    method : "POST",
    url : "/api/v1/login"
    body : {
      "username" : "sudhir",
      "password" : "0778"
    }
  }

 The response will return a JWT and user id which you need to use for the protected endpoints
================================================================================================================================================================================ 
########## Protected Endpoints ##########
