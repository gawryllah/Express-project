const User = require("../model/sequelize/User");
const ProfileRepository = require("../repository/sequelize/ProfileRepository");
const UserRepository = require("../repository/sequelize/UserRepository");
const GameRepository = require("../repository/sequelize/GameRepository");
const { use, all } = require("../routes");



exports.showProfileList = (req, res, next) => {
    ProfileRepository.getProfiles().then((profiles) => {
        res.render("pages/userprofile/userprofile-list",
         { profiles: profiles, 
        navLocation: "prof" });
      });
}

exports.showAddProfileForm = (req, res, next) => {
    let allUsers, allGames;

    UserRepository.getUsers().then(users =>{
        allUsers = users;
        return GameRepository.getGames();
    }).then(games => {
        allGames = games;
        res.render('pages/userprofile/userprofile-form', {
            profile: {},
            pageTitle: "Nowy profil",
            formMode: "createNew",
            btnLabel: "Dodaj profil",
            allUsers: allUsers,
            allGames: allGames,
            formAction: "/profiles/add", 
            navLocation: 'prof',
            validationErrors: []
        });
    })

}

exports.showProfileDetails = (req, res, next) => {
    const profileId = req.params.profileId;
   


    ProfileRepository.getProfileById(profileId).then(profile => {

        res.render("pages/userprofile/userprofile-detail", {
            profile: profile,
            formMode: "showDetails",
            pageTitle: "Szczegóły profilu",
            formAction: '',
            navLocation: "prof"
        })
    })

    
};


exports.showEditProfileForm = (req, res, next) => {
    const profileId = req.params.profileId;

    
    let allUsers, allGames, allProfiles;
    let profileEdit;

    console.log("id profilu: " + profileId);

    ProfileRepository.getProfileById(profileId)
        .then(profile => {
            
            profileEdit = profile;
            return GameRepository.getGames();
        })
        .then(
            games =>{
                allGames = games;
                return UserRepository.getUsers();
            }
        ).then(users =>{
            allUsers = users;
            console.log(profileEdit);
            res.render("pages/userprofile/userprofile-form-edit",{
                profile: profileEdit,
                allUsers: allUsers,
                allGames: allGames,
                formMode: "edit",
                pageTitle: "Edycja profilu",
                btnTitle: "Edytuj profil",
                formAction: "/profiles/edit/" + profileId,
                navLocation: "prof",
                validationErrors: {}
            });
        })
    };
    




exports.addProfile = (req, res, next) => {
    const profileData = {...req.body};
    ProfileRepository.createProfile(profileData)
    .then(result => {
        res.redirect('/profiles');
    });
};

exports.updateProfile = (req, res, next) => {
    const profileId = req.body._id;
    const profileData = {...req.body};

    let allUsers, allGames, error;
    

    ProfileRepository.updateProfile(profileId, profileData)
        .then(result => {
            res.redirect('/profiles');
    })
    .catch(err => {
        error = err;
        return UserRepository.getUsers();
    })
    .then(users => {
        allUsers = users;
        return GameRepository.getGames();
    })
    .then(games => {
        allGames = games;

        return ProfileRepository.getProfileById(profileId);
    })
    .then(profile =>{

        console.log("\n updateprofile, profid: " + profile._id + ", user:" + profile.user.userName +", game: " + profile.game.title + ", gamescore: " + profile.gameScore +  ", mvp" + profile.mvpDate + ", desc: " + profile.desc + "\n");
        res.render("pages/userprofile/userprofile-form-edit", {
            profile: profile,
            allGames: allGames,
            allUsers: allUsers,
            formMode: "edit",
            pageTitle: "Edycja profilu",
            btnTitle: "Edytuj profil",
            formAction: "/profiles/edit/" +profileId,
            navLocation: "prof",
            validationErrors: {}
        });

    })


    /*
    ProfileRepository.updateProfile(profileData, profileData)
        .then(result => {
            res.redirect('/profiles');
    });
    */
};


exports.deleteProfile = (req, res, next) => {

    console.log(req.params.profileId)
    const profileId = req.params.profileId;

    ProfileRepository.deleteProfile(profileId).then(()  => {
        res.redirect('/profiles');
    });
};
