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

//// BEGIN Zone Multer /////////


const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/images");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("imageUser"), async (req, res) => {
    try {
        const imageName = req.file.filename;
        const neededImage = imageName.toString();
        res.send(`${neededImage}`);
    } catch (err) {
        console.log(err);
        res.send('You have a problem');
    }
});

app.post('/upload-images', upload.array('images', 10), (req, res) => {
    try {
        const uploadedFiles = req.files;
        if (!uploadedFiles) {
            return res.status(400).send('No files were uploaded.');
        }
        const imagesArray = uploadedFiles.map(file => ({
            name: file.originalname,
            // data: file.buffer.toString(),
        }));
        res.json({ success: true, uploadedFiles });
    } catch (err) {
        console.log(err);
        res.send('You have a problem');
    }

});


//// END Zone Multer /////////

// Route principale pour les utilisteurs
app.use('/user', userRoute);

//Route principlae pour les annonces 
app.use('/advert', advertRoute);


app.listen(port, () => {
    console.log(`The application is correctly running on port ${port}`);
})