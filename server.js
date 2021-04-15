const express = require("express"); //for builfing rest api s
const bodyParser = require("body-parser");//parse and create req.body object
const cors = require("cors"); //express middleware

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse request of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));
//simple route for test
app.get("/", (req, res) => {
    res.json({message: "Holi"});
});

require("./app/routes/tutorial.routes")(app);

//set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('server is running on port ${PORT}');
});

const db = require("./app/models");
db.sequelize.sync({force:true}).then(() => {
    console.log('drop and re-sync db.');
});
