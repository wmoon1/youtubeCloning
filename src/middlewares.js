import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    //if logged in check if the logged in it will be 'true' unless 'false'" 
    res.locals.loggedIn = Boolean(req.session.loggedIn);

    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    console.log(req.session.user);
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        next()
    } else {
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
}

export const uploadFiles = multer({ dest: "uploads/"});