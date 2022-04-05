function getAveska(req, res) {

    let isLoggedin = req.role ? 1 : 0;
    if (req.role == "admin") {
        isLoggedin = 2;
    }
    res.render("Aveksha.ejs", { isLoggedin: isLoggedin });



}

function getContact(req, res) {
    let isLoggedin = req.role ? 1 : 0;
    if (req.role == "admin") {
        isLoggedin = 2;
    }
    res.render("contact.ejs", { isLoggedin: isLoggedin });
}

function getLanding(req, res) {
    let isLoggedin = req.role ? 1 : 0;
    res.render("landing.ejs", { isLoggedin: isLoggedin });
}

function getLoginPage(req, res) {
    if (req.user) {
        res.redirect('/stats');
    } else {
        let isLoggedin = 0;
        res.render("login.ejs", { isLoggedin: isLoggedin });
    }
}

function getRegister(req, res) {
    if (req.user) {
        res.redirect('/stats');
    } else {
        let isLoggedin = 0;
        res.render("register.ejs", { isLoggedin: isLoggedin });
    }
}

function getstats(req, res) {
    if (req.user) {
        let isLoggedin = req.role ? 1 : 0;
        if (req.role == "admin") {
            isLoggedin = 2;
        }
        res.render("stats.ejs", { isLoggedin: isLoggedin, role: req.role });
    } else {
        res.redirect('/login');
    }
}

function getProfile(req, res) {
    if (req.user) {
        let isLoggedin = req.role ? 1 : 0;
        if (req.role == "admin") {
            isLoggedin = 2;
        }
        res.render("profile.ejs", { isLoggedin: isLoggedin, user: req.user });
    } else {
        res.redirect('/login');
    }
}

function getList(req, res) {
    if (req.role == "admin") {
        let isLoggedin = req.role ? 1 : 0;
        if (req.role == "admin") {
            isLoggedin = 2;
        }
        res.render("list.ejs", { isLoggedin: isLoggedin, user: req.user });
    } else {
        res.redirect('/login');
    }
}

module.exports.getAveska = getAveska;
module.exports.getContact = getContact;
module.exports.getLanding = getLanding;
module.exports.getLoginPage = getLoginPage;
module.exports.getRegister = getRegister;
module.exports.getstats = getstats;
module.exports.getList = getList;
module.exports.getProfile = getProfile;