const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const {Mongo_Url,Port}=process.env
const cookieParser=require("cookie-parser")
const authRoute=require("../server/Routes/Auth.route")

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with the actual origin of your frontend application
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, HTTP authentication) in CORS requests
};

app.use(cors(corsOptions));

require('../server/config/mongoose.connect');
app.use(cookieParser());
app.use("/",authRoute)

app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
});
