
//This Class stores Staff Data to the Database
//The coordinator and mentor they dont have to register
//They will be given access code to acess the plartform

const mongoose = require('mongoose');
const MentorDetails = require('../Models/MentorModel');
const Mentee = require('../Models/MenteeModel');
const CoordinatorDeatils = require('../Models/CoordinatorModel');

mongoose.connect('mongodb://0.0.0.0:27017/WebWeaversData', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

lesson1 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson2 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson3 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson4 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson5 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson6 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson7 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson8 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson9 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};
lesson10 = {countPdfClicks: 0,videoClicks: 0,WhiteBoardClicks: 0,timeSpent: 0,pageVisited: 0};

TempListMentors = [{Name:"John",  Email:"JTYGGHY03@myuct.ac.za", Role:"Mentor" ,username:"John" ,Surname:"Spike",lesson1,lesson2,lesson3,
                    lesson3,lesson4,lesson5,lesson6,lesson7,lesson8,lesson9,lesson10},
                    {Name:"Brian", Email:"BNPAWI002@myuct.ac.za", Role:"Mentor" ,username:"Brian" ,Surname:"Baloi",lesson1,lesson2,lesson3,
                    lesson3,lesson4,lesson5,lesson6,lesson7,lesson8,lesson9,lesson10},
                    {Name:"James", Email:"JNEAWIY03@myuct.ac.za", Role:"Mentor" ,username:"James" ,Surname:"Ben",lesson1,lesson2,lesson3,
                    lesson3,lesson4,lesson5,lesson6,lesson7,lesson8,lesson9,lesson10},
                    {Name:"Luke", Email:"LNKAEYH01@myuct.ac.za", Role:"Mentor" ,username:"Luke" ,Surname:"Mason",lesson1,lesson2,lesson3,
                    lesson3,lesson4,lesson5,lesson6,lesson7,lesson8,lesson9,lesson10},
                    {Name:"Gary", Email:"gstewart@cs.uct.ac.za", Role:"Coordinator" ,username:"Gary" ,Surname:"Stewart",lesson1,lesson2,lesson3,
                    lesson3,lesson4,lesson5,lesson6,lesson7,lesson8,lesson9,lesson10}];


ListCoordinators ={Name:"Gary", Email:"gstewart@cs.uct.ac.za", Role:"Coordinator......" ,username:"Gary" ,Surname:"Stewart",Tax:"koee",Check:"10000"};


const seedDB = async () => {

    getAllData =  await Mentee.deleteMany({});
    

    
     for(i=0;i<TempListMentors.length;i++){
        
        const newUser = new Mentee(TempListMentors[i]);
        // await  newUser.save();
        const registerUser = await Mentee.register(newUser,"UCT07");
        
     }
   

}

seedDB().then(() => {
    console.log("data sent.....")
    mongoose.connection.close();
})