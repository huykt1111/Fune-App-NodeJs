import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./routes/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();

let app = express();
// || 'http://localhost:8081'
const corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200
}
app.use('/', express.static('src/public'));
app.use(cors(corsOptions));

// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})