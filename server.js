const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
	'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
	'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
	'origin': '*',
	'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
	'preflightContinue': false

}));

// Add Access Control Allow Origin headers



//var corsOptions = {
	//origin: "http://localhost:8081"
//};



//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route


const db = require("./api/app/models");
require("./api/app/routes/lodge.routes")(app);
require("./api/app/routes/person.routes")(app); 
db.sequelize.sync();


app.get("/", (req, res) => {
	res.json({ message: "Welcome to the Ukraine Lodge Service Test" });
});
//require("./app/routes/tutorial.routes")(app);




// set port, listen for requests
const PORT = process.env.PORT || PORT;

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"

	);
	next();
});




app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
})
