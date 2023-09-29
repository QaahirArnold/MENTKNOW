const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// This class is for students(mentees), they will have to register by providing their details.
// The data will be sent to the database , the class also stores lesson information for each lesson
//Lesson information is measure of interaction of students with material provided on the plartorm
//We measure very Interaction a student does and save it in the database for analytics

const UserSchema = new Schema({
 
    Surname: String,
    Email: String,
    Name: String,
    Role: {
        type: String,
        default: "Student"
    },
    lesson1:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson2:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson3:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson4:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson5:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson6:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson7:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    
    lesson8:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson9:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    },
    lesson10:{
        pageNo: String,
        countPdfClicks: Number,
        videoClicks: Number,
        WhiteBoardClicks: Number,
        resourcesClicks: Number,
        timeSpent: Number,
        pageVisited:Number,
        chatInteraction:Number
    }
});
UserSchema.plugin(passportLocalMongoose);
const MenteeDetails = mongoose.model('MenteeDetails', UserSchema);
module.exports = MenteeDetails;
