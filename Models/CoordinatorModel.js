const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//This class is for one of staff memnber,which in this case will be
//Coordinator, we will store Coordinator  details from our site 
// An they will have acess to the site without regitering. 


const UserSchema = new Schema ({
    username: {
        type: String,
    },
    Check: String,
    Tax: String,
    Surname: String,

    Name: String,
    Role: {
        type: String,
        default: "Coordinator"
    },
    Email: {
        type: String,
    }
    
    
});
UserSchema.plugin(passportLocalMongoose);
const CoordinatorDetails = mongoose.model('CoordinatorDetails', UserSchema);
module.exports = CoordinatorDetails;