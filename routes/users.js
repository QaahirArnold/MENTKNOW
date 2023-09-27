const express = require('express');
const router = express.Router();
const Mentee = require('../Models/MenteeModel');
// const Metrics = require('../Models/MetricsModel');
const passport = require('passport');
const { render } = require('ejs');


const multer = require('multer');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const path = require('path');

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define a variable to track whether the file is processed
let fileProcessed = false;

// ...

// Create a route to render the EJS template with the file upload form
router.get('/report', (req, res) => {
    res.render('Report', { fileProcessed });
});

// Create a route to handle file uploads
router.post('/processFile', upload.single('textFile'), async (req, res) => {
    try {
        const textData = req.file.buffer.toString(); // Process the file here

        // Use the groupSubjects function to group subjects in the text data
        const groupedSubjects = groupSubjectsFromText(textData);

        // Specify the output file path
        const outputFileName = path.join('./downloads', 'output.txt'); // Adjust the path as needed

        // Write the processed data to the output file
        writeProcessedDataToFile(groupedSubjects, outputFileName);

        // Set the fileProcessed variable to true
        fileProcessed = true;

        // Redirect back to the report page
        res.redirect('/report');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the file.');
    }
});


function groupSubjectsFromText(textData) {
    const subjects = {};
    let currentSubject = null;
    const lines = textData.split('\n');

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("Subject:")) {
            currentSubject = trimmedLine.substring(8);
            if (!(currentSubject in subjects)) {
                subjects[currentSubject] = [];
            }
        } else if (trimmedLine === '---') {
            currentSubject = null;
        } else if (currentSubject) {
            subjects[currentSubject].push(trimmedLine);
        }
    }

    return subjects;
}

// Function to write the processed data to the output file
function writeProcessedDataToFile(groupedSubjects, outputFileName) {
    fs.writeFileSync(outputFileName, ''); // Clear the output file

    for (const subject in groupedSubjects) {
        fs.appendFileSync(outputFileName, "Subject: " + subject + "\n");
        const paragraphs = groupedSubjects[subject];
        for (const paragraph of paragraphs) {
            fs.appendFileSync(outputFileName, paragraph + "\n");
        }
        fs.appendFileSync(outputFileName, "---\n");
    }
}

router.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join('./downloads', fileName);

    // Use the "res.download" method to send the file for download
    res.download(filePath, (err) => {
        if (err) {
            // Handle any errors that occur during download
            console.error(err);
            res.status(500).send('Error downloading the file.');
        }
    });
});
const{isLoggedIn} = require('../Middleware');
const{isMentorOrCoordinator} = require('../Middleware');
const CoordinatorDetails = require('../Models/CoordinatorModel');

router.get('/', (req, res) => {

    res.render('index');
})

router.get('/LogIn', (req, res) => {
    
    res.render('LogIn');
})

router.get('/Report', (req, res) => {
    
    res.render('Report');
})
router.get('/SignUp', (req, res) => {
    // req.flash('success','Successfully registered');
    
    res.render('SignUp');
})

router.get('/SectionInfo/MentorshipSession',isLoggedIn,async (req, res) => {
    
    
    res.render('SectionInfo');   
})
router.get('/viewAllboards',isLoggedIn,async (req, res) => {
    
    res.render('Allboards');   
})
router.get('/UserSection',isLoggedIn,async (req, res) => {
    
    // res.render('Mentee');
    res.render('UserOverview');   
})

router.post('/LogIn',passport.authenticate('local', {failureFlash: true, failureRedirect: '/LogIn',keepSessionInfo: true, failureMessage: true },),async (req, res) => {
  
    const redirectUrl = req.session.returnTo || '/UserSection';
    
    delete req.session.returnTo;
    req.flash("success","You are now logged in")
    req.flash("error","Incorrect Password or Username");
    res.redirect(redirectUrl);

})

//Here we are updating the data from user interaction to the database
router.post('/UpdateDateBase',isLoggedIn,async (req, res) => {
    
    const {pageNumber,countPdfClicks,videoClicks,timeSpent,WhiteBoardClicks,ElementName} = req.body;
    
    let pdf =  parseInt (countPdfClicks);
    let vid =  parseInt (videoClicks);
    let board= parseInt (WhiteBoardClicks);
    let time = parseFloat(timeSpent);
    
   
    
    
    const UpdateDateBase = async function (){
        
        await Mentee.updateMany({_id: req.user._id},{ $set: SetProperty1});
        
       
        if(ElementName==='pdFileClick'){
            await Mentee.updateMany({_id: req.user._id},{ $inc: SetProperty2});
            
        }else if(ElementName==='VideoClick'){
            await Mentee.updateMany({_id: req.user._id},{ $inc: SetProperty3});
            
        }else if(ElementName==='BoardClick'){
            await Mentee.updateMany({_id: req.user._id},{ $inc: SetProperty4});
            
        }else if(ElementName==='beforeunload'){
            await Mentee.updateMany({_id: req.user._id},{ $inc: SetProperty5});
            
        }

    };

    if(pageNumber==="page1"){
        pageVisited = req.session.countVisitedSitedPage1;
        SetProperty1 = {"lesson1.pageVisited":pageVisited}
        SetProperty2 = {"lesson1.countPdfClicks":pdf};
        SetProperty3 = {"lesson1.videoClicks":vid};
        SetProperty4 = {"lesson1.WhiteBoardClicks":board};
        SetProperty5 = {"lesson1.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page2"){
        pageVisited = req.session.countVisitedSitedPage2;
        SetProperty1 = {"lesson2.pageVisited":pageVisited}
        SetProperty2 = {"lesson2.countPdfClicks":pdf};
        SetProperty3 = {"lesson2.videoClicks":vid};
        SetProperty4 = {"lesson2.WhiteBoardClicks":board};
        SetProperty5 = {"lesson2.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    
    }else if(pageNumber==="page3"){
        pageVisited = req.session.countVisitedSitedPage3;
        SetProperty1 = {"lesson3.pageVisited":pageVisited}
        SetProperty2 = {"lesson3.countPdfClicks":pdf};
        SetProperty3 = {"lesson3.videoClicks":vid};
        SetProperty4 = {"lesson3.WhiteBoardClicks":board};
        SetProperty5 = {"lesson3.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page4"){
        pageVisited = req.session.countVisitedSitedPage4;
        SetProperty1 = {"lesson4.pageVisited":pageVisited}
        SetProperty2 = {"lesson4.countPdfClicks":pdf};
        SetProperty3 = {"lesson4.videoClicks":vid};
        SetProperty4 = {"lesson4.WhiteBoardClicks":board};
        SetProperty5 = {"lesson4.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page5"){
        pageVisited = req.session.countVisitedSitedPage5;
        SetProperty1 = {"lesson5.pageVisited":pageVisited}
        SetProperty2 = {"lesson5.countPdfClicks":pdf};
        SetProperty3 = {"lesson5.videoClicks":vid};
        SetProperty4 = {"lesson5.WhiteBoardClicks":board};
        SetProperty5 = {"lesson5.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page6"){
        pageVisited = req.session.countVisitedSitedPage6;
        SetProperty1 = {"lesson6.pageVisited":pageVisited}
        SetProperty2 = {"lesson6.countPdfClicks":pdf};
        SetProperty3 = {"lesson6.videoClicks":vid};
        SetProperty4 = {"lesson6.WhiteBoardClicks":board};
        SetProperty5 = {"lesson6.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page7"){
        pageVisited = req.session.countVisitedSitedPage7;
        SetProperty1 = {"lesson7.pageVisited":pageVisited}
        SetProperty2 = {"lesson7.countPdfClicks":pdf};
        SetProperty3 = {"lesson7.videoClicks":vid};
        SetProperty4 = {"lesson7.WhiteBoardClicks":board};
        SetProperty5 = {"lesson7.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page8"){
        pageVisited = req.session.countVisitedSitedPage8;
        SetProperty1 = {"lesson8.pageVisited":pageVisited}
        SetProperty2 = {"lesson8.countPdfClicks":pdf};
        SetProperty3 = {"lesson8.videoClicks":vid};
        SetProperty4 = {"lesson8.WhiteBoardClicks":board};
        SetProperty5 = {"lesson8.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page9"){
        pageVisited = req.session.countVisitedSitedPage9;
        SetProperty1 = {"lesson9.pageVisited":pageVisited}
        SetProperty2 = {"lesson9.countPdfClicks":pdf};
        SetProperty3 = {"lesson9.videoClicks":vid};
        SetProperty4 = {"lesson9.WhiteBoardClicks":board};
        SetProperty5 = {"lesson9.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }else if(pageNumber==="page10"){
        pageVisited = req.session.countVisitedSitedPage10;
        SetProperty1 = {"lesson10.pageVisited":pageVisited}
        SetProperty2 = {"lesson10.countPdfClicks":pdf};
        SetProperty3 = {"lesson10.videoClicks":vid};
        SetProperty4 = {"lesson10.WhiteBoardClicks":board};
        SetProperty5 = {"lesson10.timeSpent":time};
        UpdateDateBase(pageVisited,1,SetProperty1,SetProperty2,SetProperty3,SetProperty4,SetProperty5);
    }
    res.sendStatus(200);

})


//This router is Regitering User information to the data base
router.post('/Register', async (req, res) => {
    
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

    
    
    const {username,Name,Surname,password,Email} = req.body;

    const newUser = new Mentee({username,Surname,Email,Name,lesson1,lesson2,lesson3,lesson4,lesson5,
        lesson6,lesson7,lesson8,lesson9,lesson10})
    try {
        const registerUser = await Mentee.register(newUser,password);
        req.login(registerUser, function(err) {
            if (err) { return next(err); }
            return res.redirect('/UserSection');
          });
    } catch (error) {
        req.flash('error', 'A user with a given username is already registered');
        res.redirect('/SignUp');
    }
   
})


//This route ends session when user logs out
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


  //Router for displaying Graphs
router.post('/Analysis',isLoggedIn,async (req, res) => {
    
 
    const GetAllData =  await Mentee.find({});
    
    const {LessonNumber} = req.body;

    TotalsPdfClicks = 0;
    TotalsVideoClicks = 0;
    TotalsBoardClicks = 0;
    TotalTime = 0;
    TotalpageVisit = 0;



    CombinedLessons = ['lesson1','lesson2','lesson3','lesson4','lesson5','lesson6','lesson7','lesson8','lesson9','lesson10'];
    CombinedPdfClicks = [];
    CombinedVideoClicks = [];
    CombinedBoardClicks = [];
    CombinedTotalTime = [];
    CombinedTotalpageVisit = [];
    
    if(LessonNumber==="All"){
        for(let i=0;i<CombinedLessons.length;i++){
            for(let j=0;j<GetAllData.length;j++){
                

                TotalsPdfClicks+= GetAllData[j][CombinedLessons[i]].countPdfClicks;
                TotalsVideoClicks+= GetAllData[j][CombinedLessons[i]].videoClicks;
                TotalsBoardClicks+= GetAllData[j][CombinedLessons[i]].WhiteBoardClicks;
                TotalTime+= (GetAllData[j][CombinedLessons[i]].timeSpent);
                TotalpageVisit+= GetAllData[j][CombinedLessons[i]].pageVisited;

                
                
                
            }
            CombinedPdfClicks.push(TotalsPdfClicks);
            CombinedVideoClicks.push(TotalsVideoClicks);
            CombinedBoardClicks.push(TotalsBoardClicks);
            CombinedTotalTime.push(TotalTime);
            CombinedTotalpageVisit.push(TotalpageVisit);

            TotalsPdfClicks = 0;
            TotalsVideoClicks = 0;
            TotalsBoardClicks = 0;
            TotalTime = 0;
            TotalpageVisit = 0;

        }

   
        
        return res.render('Analysis',{CombinedPdfClicks,CombinedVideoClicks,CombinedBoardClicks,CombinedTotalTime,CombinedTotalpageVisit,LessonNumber});


        
    }else{
        for(let i=0;i<GetAllData.length;i++){
            
           
                TotalsPdfClicks+= GetAllData[i][LessonNumber].countPdfClicks;
                TotalsVideoClicks+= GetAllData[i][LessonNumber].videoClicks;
                TotalsBoardClicks+= GetAllData[i][LessonNumber].WhiteBoardClicks;
                TotalTime+= GetAllData[i][LessonNumber].timeSpent;
                TotalpageVisit+= GetAllData[i][LessonNumber].pageVisited;

            
           
            
        }
    }  
    TotalTime = TotalTime.toFixed(2);
   
    return res.render('Analysis',{TotalsPdfClicks,TotalsVideoClicks,TotalsBoardClicks,TotalTime,TotalpageVisit,LessonNumber});  
})

router.get('/Analysis',isLoggedIn,async (req, res) => {
    TotalsVideoClicks= 0;
    TotalsPdfClicks =0;
    TotalsBoardClicks=0;
    TotalTime = 0;
    TotalpageVisit =0;
    LessonNumber = "NOTHING";
    CombinedPdfClicks = [];
    CombinedVideoClicks =[];
    CombinedBoardClicks =[];
    CombinedTotalTime = [];
    CombinedTotalpageVisit =[];
    res.render('Analysis',{TotalsPdfClicks,TotalsVideoClicks,TotalsBoardClicks,TotalTime,TotalpageVisit,LessonNumber});
})


module.exports =router;
