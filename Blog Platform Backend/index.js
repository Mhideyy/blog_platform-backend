// importing express into  this file
const express = require('express');


// importing routes
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');
const authRoute = require('./routes/auth');

// importing mongoose
 const mongoose = require('mongoose');

// importing dotenv
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// configuring env
dotenv.config();

// connecting to mongodb
mongoose
        .connect(process.env.MONGO_URL)

// checking if the connection is established
        .then(()=> console.log('connected'))

// checking if there is an error while connecting to mongodb
        .catch(()=> console.log('error'))
// extracting the values of express to app
const app = express();

// middle ware is used to extract data from the client/body
app.use(express.json());
app.use(cookieParser());

// assinging the port
const PORT = process.env.PORT || 5000;

// a middleware thast carries all the functions and routes
app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(authRoute);


app.listen(PORT, () => {
            console.log(`app is running at ${PORT}`);
});

