var express=require("express");
var bodyParser=require('body-parser');
 
var conn = require('./config');
var app = express();
app.use(express.static("118_Fitness"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use("images", express.static(__dirname + "/118_Fitness/img"));
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Different paths in the server. The server will respond depending on the requested path.
app.get('/', function (req, res) {
   res.redirect('/0_Home.html') 
})

app.get('*', function(req, res){
	res.redirect('/0_Home.html')
})
 
app.get('/0_Home.html', function(req, res){
	res.sendFile("0_Home.html");
})

app.get('/1_SignUp.html', function (req, res) {  
	res.sendFile( "/1_SignUp.html" );  
})

app.get('/1_login.html', function (req, res) {  
	res.sendFile( "/1_login.html" );  
})

app.get('/1_user.html', function (req, res) {  
	res.sendFile( "/1_user.html" );  
})

app.get('/2_chest.html', function (req, res) {  
   res.sendFile( "2_chest.html" );  
})  

app.get('/2_arm.html', function (req, res) {  
	res.sendFile( "2_arm.html" );  
})  

 app.get('/2_leg.html', function (req, res) {  
	res.sendFile( "2_leg.html" );  
})  

 app.get('/2_abs.html', function (req, res) {  
	res.sendFile( "2_abs.html" );  
})  

app.get('/3_chestVideo.html', function (req, res) {  
	res.sendFile( "/3_chestVideo.html" );  
})  

app.get('/3_armVideo.html', function (req, res) {  
	res.sendFile( "/3_armVideo.html" );  
})

app.get('/3_absVideo.html', function (req, res) {  
	res.sendFile( "/3_absVideo.html" );  
})

app.get('/3_legVideo.html', function (req, res) {  
	res.sendFile( "/3_legVideo.html" );  
})


app.post('/1_SignUp', function(req, res){
	conn.query("INSERT INTO userlogin(email, username, password) VALUES (?, ?, ?);", [req.body.email, req.body.username, req.body.password], function(error, results, fields){
		if(error){
			console.log(error);
			res.json({
				success: false
			});
		} else {
			res.json({
				success: true
			})
		}
	});

});


app.post('/1_login', function(req, res){
	conn.query("SELECT * FROM userlogin WHERE email=?", req.body.email, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		if(error){
			success = false;
			message = "Unknown error occured";
		} else {
			console.log(results)
			if((results.length) > 0){
				if(results[0].username == body.username){
					if(results[0].password == body.password){
						success = true;		// Assign appropriate value to the variable status
						message = "1_user.html?id=" + results[0].username;
					} else {
						success = false;		// Assign appropriate value to the variable status
						message = "PASSWORD incorrect";	// REPLACE (X) with appropriate values from EMAIL, USERNAME, PASSWORD
					}
				} else {
					success = false;			// Assign appropriate value to the variable status
					message = "USERNAME incorrect";		// REPLACE (X) with appropriate values from EMAIL, USERNAME, PASSWORD
				}
			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "EMAIL incorrect";			// REPLACE (X) with appropriate values from EMAIL, USERNAME, PASSWORD
			}
			
		}
	res.json({
				success: success,
				message: message
			});
			
	})

})

app.post('/1_user', function(req, res){
	conn.query("SELECT * FROM userlogin WHERE username=?", req.body.username, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		console.log(body)
		if(error){
			success = false;
			message = "user Unknown error occured";
		} else {
			if((results.length) > 0){
				uccess = true;
				message = "<h5>Hello " + results[0].username + "</h5>";

			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})



app.post('/2_chest', function(req, res){
	conn.query("SELECT * FROM photo WHERE class=?", req.body.class, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
		} else {
			if((results.length) > 0){
				success = true;
				for (var i = 0; i < results.length; i++) {
					message += "<div class='item2'>" + "<a href='3_chestVideo.html?id=" + results[i].id + "'>" +
					"<img src= 'img/img" + results[i].id + ".png'></a>" + 
					"<h4>" + results[i].name + "</h4>" +
					"</div>";
				}
			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/2_arm', function(req, res){
	conn.query("SELECT * FROM photo WHERE class=?", req.body.class, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
		} else {
			if((results.length) > 0){
				success = true;
				for (var i = 0; i < results.length; i++) {
					message += "<div class='item2'>" + "<a href='3_armVideo.html?id=" + results[i].id + "'>" +
					"<img src= 'img/img" + results[i].id + ".png'></a>" + 
					"<h4>" + results[i].name + "</h4>" +
					"</div>";
				}
			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/2_leg', function(req, res){
	conn.query("SELECT * FROM photo WHERE class=?", req.body.class, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
		} else {
			if((results.length) > 0){
				success = true;
				for (var i = 0; i < results.length; i++) {
					message += "<div class='item2'>" + "<a href='3_legVideo.html?id=" + results[i].id + "'>" +
					"<img src= 'img/img" + results[i].id + ".png'></a>" + 
					"<h4>" + results[i].name + "</h4>" +
					"</div>";
				}
			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/2_abs', function(req, res){
	conn.query("SELECT * FROM photo WHERE class=?", req.body.class, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
		} else {
			if((results.length) > 0){
				success = true;
				for (var i = 0; i < results.length; i++) {
					message += "<div class='item2'>" + "<a href='3_absVideo.html?id=" + results[i].id + "'>" +
					"<img src= 'img/img" + results[i].id + ".png'></a>" + 
					"<h4>" + results[i].name + "</h4>" +
					"</div>";
				}
			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})


// This function will be called when a user tries to login. It will try to fetch the user details using the email that is entered and compare the remaining values to the ones present in the database.
app.post('/3_chestVideo', function(req, res){
	conn.query("SELECT * FROM photo WHERE id=?", req.body.id, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
			console.log(results);
		} else {
			console.log(results);
			
			if((results.length) > 0){
				success = true;
				message = "<div class='item3' style='margin:0 -20px;' >" + 
					"<video autoplay muted loop>" +
					"<source src='Video/video" + results[0].id +
					".mp4' type='video/mp4' style='width: 500px;'>" +
					"</video> </div> <div class='item3'> <h2>" +
					results[0].name + "</h2> <p>" + 
					results[0].discription + "</p> </div>" ;


			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/3_armVideo', function(req, res){
	conn.query("SELECT * FROM photo WHERE id=?", req.body.id, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
			console.log(results);
		} else {
			console.log(results);
			
			if((results.length) > 0){
				success = true;
				message = "<div class='item3'>" + 
					"<video style='margin:0 -5px;' autoplay muted loop>" +
					"<source src='Video/video" + results[0].id +
					".mp4' type='video/mp4' style='width: 500px;'>" +
					"</video> </div> <div class='item3'> <h2>" +
					results[0].name + "</h2> <p>" + 
					results[0].discription + "</p> </div>" ;


			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/3_absVideo', function(req, res){
	conn.query("SELECT * FROM photo WHERE id=?", req.body.id, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
			console.log(results);
		} else {
			console.log(results);
			
			if((results.length) > 0){
				success = true;
				message = "<div class='item3'>" + 
					"<video style='margin:0 -5px;' autoplay muted loop>" +
					"<source src='Video/video" + results[0].id +
					".mp4' type='video/mp4' style='width: 500px;'>" +
					"</video> </div> <div class='item3'> <h2>" +
					results[0].name + "</h2> <p>" + 
					results[0].discription + "</p> </div>" ;


			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})

app.post('/3_legVideo', function(req, res){
	conn.query("SELECT * FROM photo WHERE id=?", req.body.id, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		var text= "";
		if(error){
			success = false;
			message = "Unknown error occured";
			console.log(results);
		} else {
			console.log(results);
			
			if((results.length) > 0){
				success = true;
				message = "<div class='item3'>" + 
					"<video style='margin:0 -5px;' autoplay muted loop>" +
					"<source src='Video/video" + results[0].id +
					".mp4' type='video/mp4' style='width: 500px;'>" +
					"</video> </div> <div class='item3'> <h2>" +
					results[0].name + "</h2> <p>" + 
					results[0].discription + "</p> </div>" ;


			} else {
				success = false;				// Assign appropriate value to the variable status
				message = "index page incorrect";
			}	
			
		}
	res.json({
				success: success,
				message: message
			});
	})

})


app.listen(3000);