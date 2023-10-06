const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const {Mongo_Url,Port}=process.env
const cookieParser=require("cookie-parser")
const authRoute=require("../server/Routes/Auth.route")

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true,
}));

require('../server/config/mongoose.connect');
app.use(cookieParser());
app.use("/",authRoute)

app.listen(Port, () => {
    console.log(`Server is listening on port ${Port}`);
});
