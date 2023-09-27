
//Here we are defining routes for each lessopages
//Each page have diffrent material ,so we need to display 
//content related to each lesson
//We are using passport authentication to protect each route
//Only users who are authenticated and authorized are allowed to access the pages
const express = require('express');
const router = express.Router();
const Mentee = require('../Models/MenteeModel');
const Metrics = require('../Models/MetricsModel');
const passport = require('passport');
const { render } = require('ejs');
const{isLoggedIn} = require('../Middleware');



router.get('/LessonPage/lesson1',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage1) {
        req.session.countVisitedSitedPage1 += 1;
    } else {
        req.session.countVisitedSitedPage1 = 1;
    }
    
    
    return res.render('LessonPage1');
})
router.get('/LessonPage/lesson2',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage2) {
        req.session.countVisitedSitedPage2 += 1;
    } else {
        req.session.countVisitedSitedPage2 = 1;
    }
    
    
    return res.render('LessonPage2');
})
router.get('/LessonPage/lesson3',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage3) {
        req.session.countVisitedSitedPage3 += 1;
    } else {
        req.session.countVisitedSitedPage3 = 1;
    }
    
    
    return res.render('LessonPage3');
})
router.get('/LessonPage/lesson4',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage4) {
        req.session.countVisitedSitedPage4 += 1;
    } else {
        req.session.countVisitedSitedPage4 = 1;
    }
    
    
    return res.render('LessonPage4');
})
router.get('/LessonPage/lesson5',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage5) {
        req.session.countVisitedSitedPage5 += 1;
    } else {
        req.session.countVisitedSitedPage5 = 1;
    }
    
    
    return res.render('LessonPage5');
})

router.get('/LessonPage/lesson6',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage6) {
        req.session.countVisitedSitedPage6 += 1;
    } else {
        req.session.countVisitedSitedPage6 = 1;
    }
    
    
    return res.render('LessonPage6');
})
router.get('/LessonPage/lesson7',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage7) {
        req.session.countVisitedSitedPage7 += 1;
    } else {
        req.session.countVisitedSitedPage7 = 1;
    }
    
    
    return res.render('LessonPage7');
})
router.get('/LessonPage/lesson8',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage8) {
        req.session.countVisitedSitedPage8 += 1;
    } else {
        req.session.countVisitedSitedPage8 = 1;
    }
    
    
    return res.render('LessonPage8');
})
router.get('/LessonPage/lesson9',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage9) {
        req.session.countVisitedSitedPage9 += 1;
    } else {
        req.session.countVisitedSitedPage9 = 1;
    }
    
    
    return res.render('LessonPage9');
})
router.get('/LessonPage/lesson10',isLoggedIn,async (req, res) => {
  
    if (req.session.countVisitedSitedPage10) {
        req.session.countVisitedSitedPage10 += 1;
    } else {
        req.session.countVisitedSitedPage10 = 1;
    }
    
    
    return res.render('LessonPage10');
})




module.exports =router;