const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../app');

describe('Testing the app',()=>{
    //test user api
	it('checking user existence',(done)=>{
		request(app).post('/api/v1/user/login')
			.send({
				username : "sudhir",
				password : "0778"
			})
			.then((res)=>{
                const body = res.body;
				expect(body).to.contain.property('message');
                expect(body).to.contain.property('token');
                token = body.token;
				expect(body).to.contain.property('userId');                
				done();
			})
			.catch((err)=>done(err));
    });
    it('checking create user',(done)=>{
		request(app).post('/api/v1/user/signup')
			.send({
				username : "sudhir",
				password : "0778"
			})
			.then((res)=>{
                const body = res.body;
				expect(body).to.contain.property('success');
				done();
			})
			.catch((err)=>done(err));
    });
    //test movie api
    // fetchMovies
	it('checking Movies after login request',(done)=>{
		request(app).post('/api/v1/user/login')
		.send({
			username : "sudhir",
			password : "0778"
		})
		.then((res)=>{
			const body = res.body;
			request(app).get('/api/v1/movies/getMovieById?movieId=american-hustle&userId=5fe887b0ebdb5a066c395ddf')
				.set('Authorization',`${body.token}`)
				.then((res)=>{
                    expect(res.statusCode).to.equal(200);
					done();
				})
				.catch((err)=>done(err))

		})
		.catch((err)=>done(err));
    });
    
    it('checking fetch Movies after login request',(done)=>{
		request(app).post('/api/v1/user/login')
		.send({
			username : "sudhir",
			password : "0778"
		})
		.then((res)=>{
			const body = res.body;
			request(app).get('/api/v1/movies/fetchMovies?title=american-hustle&userId=5fe887b0ebdb5a066c395ddf')
				.set('Authorization',`${body.token}`)
				.then((res)=>{
                    expect(res.statusCode).to.equal(200);
					done();
				})
				.catch((err)=>done(err))

		})
		.catch((err)=>done(err));
	});
    // fetch user history after login
    it('checking user history api after login request',(done)=>{
		request(app).post('/api/v1/user/login')
		.send({
			username : "sudhir",
			password : "0778"
		})
		.then((res)=>{
			const body = res.body;
			request(app).get('/api/v1/userActivity/fetchHistoryByUserId?userId=5fe887b0ebdb5a066c395ddf')
				.set('Authorization',`${body.token}`)
				.then((res)=>{
                    expect(res.statusCode).to.equal(200);
					done();
				})
				.catch((err)=>done(err))

		})
		.catch((err)=>done(err));
    });
    // set Favourite Movie after login
    it('checking setFavouriteMovie api after login request',(done)=>{
		request(app).post('/api/v1/user/login')
		.send({
			username : "sudhir",
			password : "0778"
		})
		.then((res)=>{
			const body = res.body;
			request(app).post('/api/v1/userActivity/setFavouriteMovie')
                .set('Authorization',`${body.token}`)
                .send({
                    userId : "5fe887b0ebdb5a066c395ddf",
                    favMovieFlag : true,
                    movieId : "american-hustle"
                })
				.then((res)=>{
                    expect(res.statusCode).to.equal(200);
					done();
				})
				.catch((err)=>done(err))

		})
		.catch((err)=>done(err));
    });
    
    // fetch logs after login
    it('checking setFavouriteMovie api after login request',(done)=>{
		request(app).post('/api/v1/user/login')
		.send({
			username : "sudhir",
			password : "0778"
		})
		.then((res)=>{
			const body = res.body;
			request(app).get('/api/v1/logs/fetchLogs?level=info&message=get')
                .set('Authorization',`${body.token}`)
				.then((res)=>{
                    expect(res.statusCode).to.equal(200);
					done();
				})
				.catch((err)=>done(err))

		})
		.catch((err)=>done(err));
	});
})