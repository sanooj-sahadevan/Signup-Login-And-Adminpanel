const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const userRoutes = require("./routes/userRoutes.js")
const adminRouter = require("./routes/adminRoutes.js");
const dotenv = require("dotenv");
const morgan = require("morgan");


//dot env config
dotenv.config();

//Logger
app.use(morgan("dev"));

require('./models/datbaseModel.js')
require("./models/userModel.js")
require("./models/adminModel.js")



//cache
const nocache = require("nocache");
app.use(nocache());


//set
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public"))); // for adding external files to view engine


//session handling

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "my secret",
  })
);


//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Adding routes
app.use(userRoutes);
app.use(adminRouter)


//port
const port = process.env.PORT || 7000

app.listen(port, () => {
  console.log("server running");
})
