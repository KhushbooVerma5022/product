const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data_db').then((res) => {
    console.log('MongoDB successfully connected.')
}).catch(error => {
    console.error(error);
});

module.exports = mongoose;