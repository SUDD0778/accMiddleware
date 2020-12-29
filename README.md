# basic app

Some info about the APIs

3 APIs :

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

Request : {
    method : "GET",
    headers : {
      Authorization : "token",
      content-type : "application/json"
    },    
    url : "/api/v1/logs/fetchLogs?userId=5fe887b0ebdb5a066c395ddf&message=get&skip=0&limit=5"
 }, 




