
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const { databaseInit } = require("./database/connection");

// api routers
const auth = require("./api/routes/auth");
const event =  require("./api/routes/event");

const app = express();
// Bodyparser middleware
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());


const assetFolder = path.resolve(__dirname, './build/');
app.use('/uploads', express.static('uploads'));
app.use('/avatar', express.static('uploads/avatar'));
app.use('/ticket', express.static('uploads/ticket'));
app.use('/event', express.static('uploads/event'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/event", event);

app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

const port = process.env.PORT || 5000; // 



databaseInit().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server up and running on port ${port} !`)

    });
}).catch(err => {

})
