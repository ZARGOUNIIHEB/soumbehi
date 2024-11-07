const express = require('express');
const advertRoute = express.Router();

const { addAdvert, getAdvertById, updateAdvert, deleteAdvert, getAllAdverts } = require('../controllers/AdvertControllers');


advertRoute.use(express.json());

//http://localhost:5000/advert/addAdvert
advertRoute.post('/addAdvert', addAdvert);

//http://localhost:5000/advert/getAdvertById/:id
advertRoute.get('/getAdvertById/:id', getAdvertById);

//http://localhost:5000/advert/updateAdvert/:id
advertRoute.put('/updateAdvert/:id', updateAdvert)

//http://localhost:5000/advert/deleteAdvert/:id
advertRoute.delete('/deleteAdvert/:id', deleteAdvert);

//http://localhost:5000/advert/allAdverts
advertRoute.get('/allAdverts', getAllAdverts);

module.exports = advertRoute;
