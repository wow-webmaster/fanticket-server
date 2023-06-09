
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
const ticket =  require("./api/routes/ticket");
const { ParseTextFromImage } = require("./util/TicketImageParser");

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
app.use('/events', express.static('uploads/events'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/event", event);
app.use("/api/v1/ticket", ticket);


app.use(express.static(assetFolder));
app.use("*", express.static(assetFolder));

const port = process.env.PORT || 5000; // 



databaseInit().then(() => {
    const server = app.listen(port, () => {
        console.log(`Server up and running on port ${port} !`)
        // ParseTextFromImage({file:`${__dirname}/uploads/ticket/Untitled.png`});
    });
}).catch(err => {

})
