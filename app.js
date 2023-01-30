// const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authorization = require("./Middlewares/authorizationMW.js")

const server = express();


const teachersRouter = require("./Routes/teachersRouter");
const childsRouter = require("./Routes/childsRouter");
const classesRouter = require("./Routes/classesRouter");
const loginRouter = require("./Routes/loginRouter")




//**********************setting DB Connection***************************//
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/NurserySystem")
    .then(() => {
        console.log("database Connected successfully");
        server.listen(8080, () => {
            console.log("started listening port: 8080");
        })
    })
    .catch(error => {
        console.log("error: " + error)
    })


//morgan(':method :url :status - :response-time ms');

// server.use(morgan('tiny'));


//**************** Routers****************** */

//setting posting data to be json object
server.use(express.json());

//login
server.use(loginRouter);

//authorization

server.use(authorization);
//teatchers Router
server.use(teachersRouter);

//childs Router
server.use(childsRouter);


//childs Router
server.use(classesRouter);

// server.use(childsRouter)









server.use((request, response, next) => {

    if (true) {
        // next();
        console.log("layer2")
    } else {
        next(new Error("Not Authenticated"));
    }
})
//not found layer
server.use((request, response, next) => {
    response.status(404).json({ data: "requested page not found" });
})

//error handling
server.use((error, request, response, next) => {
    response.status(500).json({ message: error + "" });
});

