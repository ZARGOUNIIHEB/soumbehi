const express = require('express');

const app = express();
const ConnectDb = require('./config/ConnectDb');
const cors = require('cors');
const advert = require("./model/Advert");

const userRoute = require('./routes/UserRoutes');
const advertRoute = require('./routes/AdvertRoutes');


require('dotenv').config();

const port = process.env.PORT;


app.use(express.json());

ConnectDb();
app.use(cors());

// Route principale pour les utilisteurs
app.use('/user', userRoute);

//Route principlae pour les annonces 
app.use('/advert', advertRoute);


app.listen(port, () => {
    console.log(`The application is correctly running on port ${port}`);
})