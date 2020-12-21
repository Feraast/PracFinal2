var mongoose = require("mongoose");

// localhost:27017 is where mongo service is running 
// Connect to the database
mongoose.connect('mongodb://localhost:27017/jokes', {useNewUrlParser: true, useUnifiedTopology: true});

// we create a schema first 
// Define our schema
const joke = new mongoose.Schema({
    setup: String,
    delivery: String,
  })


// we create a collection called userModel with the userSchema
module.exports = new mongoose.model('jokeModel', joke);