const UserRepository = require("../repository/sequelize/UserRepository");

exports.showUserList = (req, res, next) => {
    UserRepository.getUsers().then((users) => {
        res.render("pages/user/user-list", { users: users, 
                                        navLocation: "usr" });
      });
}

exports.showAddUserForm = (req, res, next) => {
    res.render('pages/user/user-form', {
        usr: {},
        pageTitle: "Nowy użytkownik",
        formMode: "createNew",
        btnLabel: "Dodaj użytkownika",
        formAction: "/users/add", 
        navLocation: 'usr',
        validationErrors: {}
    });
}

exports.showUserDetails = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.getUserById(userId).then(user => {
        res.render("pages/user/user-detail", {
            user: user,
            formMode: "showDetails",
            pageTitle: "Szczegóły użytkownika",
            formAction: '',
            navLocation: "usr"
        })
    })
    
}

exports.showEditUserForm = (req, res, next) => {
    const userId = req.params.userId;
    UserRepository.getUserById(userId).then(user =>{
        res.render("pages/user/user-form-edit",{
            user: user,
            formMode: "edit",
            pageTitle: "Edycja użytkownika",
            btnTitle: "Edytuj użytkownika",
            formAction: "/users/edit/" + userId,
            navLocation: "usr",
            validationErrors: {}
        });
    });
}

exports.addUser = (req, res, next) => {
    const userData = {...req.body};
    UserRepository.createUser(userData)
    .then(result => {
        res.redirect('/users');
    })
    .catch(err =>{
        console.log(err.errors)
        res.render('pages/user/user-form',{
        user: userData,
        pageTitle: "Nowy użytkownik",
        formMode: "createNew",
        btnLabel: "Dodaj użytkownika",
        formAction: "/users/add", 
        navLocation: 'usr',
        validationErrors: err.errors
     });
    });
    
};

exports.updateUser = (req, res, next) => {
    const userId = req.body._id;
    const userData = {...req.body};

    UserRepository.updateUser(userId, userData)
        .then(result => {
            res.redirect('/users')
    
        })
        .catch(err => {
            console.log(err.errors)
            res.render('pages/user/user-form-edit',{
            user: userData,
            pageTitle: "Edycja użytkownika",
            formMode: "edit",
            btnLabel: "Edytuj użytkownika",
            formAction: "/users/edit/" + userId, 
            navLocation: 'usr',
            validationErrors: err.errors
         });
    });
};


exports.deleteUser = (req, res, next) => {

    console.log(req.params.userId)
    const userId = req.params.userId;

    UserRepository.deleteUser(userId).then(()  => {
        res.redirect('/users');
    });
};


