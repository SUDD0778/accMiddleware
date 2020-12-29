# basic app

#prerequisites

Install latest Node version and mocha are required for testing API

Mongodb is required for this project

Steps to be followed- 

1. Clone this repository https://github.com/SUDD0778/accMiddleware

2. Run Npm install 

3. Start node server by running server/app.js file

4. Once server start running following api's can be tested


Some info about the APIs

APIs :

########## Public Endpoint ##########
  LOGIN 
  
  TOKEN RETRIEVAL & USERID

  Request : {
    method : "POST",
    url : "/api/v1/user/login"
    body : {
      "username" : "sudhir",
      "password" : "0778"
    }
  },

  SIGN UP

  Request : {
    method : "POST",
    url : "/api/v1/user/signUp"
    body : {
      "username" : "sudhir",
      "password" : "0778"
    }
  }

 The response will return a JWT and user id which you need to use for the protected endpoints
================================================================================================================================================================================ 
########## Protected Endpoints ##########

CHAGE PASSWORD

Request : {
    method : "POST",
    url : "/api/v1/user/changePassword",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },
    body : {
      "username" : "sudhir",
      "oldPass" : "0778",
      "newPass" : "0000"
    }
  }

MOVIES
  
FOR FILTERING MOVIES

Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/movies/fetchMovies"
 },

 FOR FETCH MOVIE BY ID
 
 Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/movies/getMovieById"
 },
 
USER ACTIVITY

FETCH USER HISTORY BY ID

Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/userActivity/fetchHistoryByUserId"
 },

FETCH FAVOURITE USER BY ID

 Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/userActivity/fetchFavouriteByUserId"
 },
 
SET/REMOVE FAVOURITE MOVIE

 Request : {
    method : "POST",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/userActivity/setFavouriteMovie",
    body : {
      userId : '5fe887b0ebdb5a066c395ddf'
      favMovieFlag : true,
      movieId : 'american-hustle'
    }
 }

LOGS

FETCH LOGS

Parameter - level // required can be set to info for logs and error for error logs
Parameter - searchQuery // to search anything present in query string 
Parameter - statusCode // to search by status code
Parameter - skip // by deafult 0
Parameter - limit // by deafult 10
Parameter - projection // can pass projection 
Parameter - fromDate and toDate  // can passed to fetch data in date range


Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/logs/fetchLogs?userId=5fe887b0ebdb5a066c395ddf&searchQuery=get&skip=0&limit=5"
 }, 




