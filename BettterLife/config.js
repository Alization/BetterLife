var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '35.202.185.150',
  user     : 'my user account',		//CHANGE THE USERNAME HERE		
  password : 'password118',		//CHANGE THE PASSWORD HERE
  port     : '65148',			//CHANGE THE PORT HERE
  database : 'betterLife'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database.\n", err);
}
});

module.exports = connection;