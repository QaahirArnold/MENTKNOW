
//This function is a middleware that is going to test 
//if the user is autheticated if not it will redirect 
//them to log in

module.exports.isLoggedIn = (req, res, next) => {
    
    
    if (!req.isAuthenticated()) {


        return res.redirect('/LogIn');
    }
    next();
}



