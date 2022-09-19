const { use } = require('../app.js');
const UserRepository = require('../repository/sequelize/UserRepository.js');
authUtil = require("../util/authUtils");


exports.login = (req, res, next) => {

    console.log('login');
    const email = req.body.email;
    const pwd = req.body.password;

    console.log('mail w body: ' + email + ', pwd: ' + pwd);

    UserRepository.findByEmail(email)

        .then(user => {
            console.log('w then:' + user)

            if(!user) {
                console.log('w if ');
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                    
                })

            } else if(authUtil.comparePasswords(pwd, user.password) === true)  {
                console.log('w else if ');
                req.session.loggedUser = user;
                console.log('req.session.loggedUser: ' + user);
                res.redirect('/');

            } else {
                console.log('w else');
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}
