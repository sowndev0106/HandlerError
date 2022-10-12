const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/handller_error_database')
    .then(() => console.log("Connection to mongodb success!"))
    .catch((err) => console.log(err))

const User = new mongoose.Schema({
    name: String,
    sex: Boolean
});
const UserModel = mongoose.model('User', User);
module.exports = {User:UserModel}