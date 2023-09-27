const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


//This class is for one of staff memnber,which in this case will be
//Mentor, we will store Mentor  details from our site 
// An they will have access to the site without regitering
const UserSchema = new Schema({
    username: {
        type: String,
    },
    Surname: String,
    Name: String,
    Role: {
        type: String,
        default: "Mentor"
    },

    Email: {
        type: String,
    }
    
    
});
UserSchema.plugin(passportLocalMongoose);
const MentorDetails = mongoose.model('MentorDetails', UserSchema);
module.exports = MentorDetails;