const GameRepository = require("../repository/sequelize/GameRepository");

exports.showGameList = (req, res, next) => {
    GameRepository.getGames().then((games) => {
        res.render("pages/game/game-list", { games: games, 
                                        navLocation: "game" });
      });
}

exports.showAddGameForm = (req, res, next) => {
    res.render('pages/game/game-form', {
        usr: {},
        pageTitle: "Nowa gra",
        formMode: "createNew",
        btnLabel: "Dodaj grę",
        formAction: "/games/add", 
        navLocation: 'game',
        validationErrors: {}
    });
}

exports.showGameDetails = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.getGameById(gameId).then(game => {
        res.render("pages/game/game-detail", {
            game: game,
            formMode: "showDetails",
            pageTitle: "Szczegóły gry",
            formAction: '',
            navLocation: "game"
        })
    })
    
}

exports.showEditGameForm = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.getGameById(gameId).then(game =>{
        res.render("pages/game/game-form-edit",{
            game: game,
            formMode: "edit",
            pageTitle: "Edycja gry",
            btnTitle: "Edytuj grę",
            formAction: "/game/edit",
            navLocation: "game",
            validationErrors: {}
        });
    });
}

exports.addGame = (req, res, next) => {
    const userData = {...req.body};
    GameRepository.createGame(userData)
    .then(result => {
        res.redirect('/games');
    })
    .catch(err => {
        console.log(err.errors)
        res.render("pages/game/game-form", {
        pageTitle: "Nowa gra",
        formMode: "createNew",
        btnLabel: "Dodaj grę",
        formAction: "/games/add", 
        navLocation: 'game',
        validationErrors: err.errors
     });
    });
};

exports.updateGame = (req, res, next) => {
    const userId = req.body._id;
    const userData = {...req.body};

    GameRepository.updateGame(userId, userData)
    .then(result => {
        res.redirect('/games');

    }).catch(err => {
        console.log(err.errors)
        res.render("pages/game/game-form-edit", {
        pageTitle: "Edytuj gre",
        formMode: "edit",
        btnLabel: "Dodaj grę",
        formAction: "/games/edit/", 
        navLocation: 'game',
        validationErrors: err.errors
     })
    });
};


exports.deleteGame = (req, res, next) => {

    console.log(req.params.gameId)
    const gameId= req.params.gameId;

    GameRepository.deleteGame(gameId).then(()  => {
        res.redirect('/games');
    });
};


