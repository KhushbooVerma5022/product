require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_STRING).then((res) => {
    console.log('MongoDB successfully connected.')
}).catch(error => {
    console.error(error);
});

module.exports = mongoose;