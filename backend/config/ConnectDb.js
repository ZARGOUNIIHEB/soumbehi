const mongoose = require('mongoose');
const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE_CONFIG);
        console.log('You are connected to your database soumbehi');
    } catch (err) {
        console.log(err);
    }
}
module.exports = ConnectDb;