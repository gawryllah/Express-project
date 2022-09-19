const User = require("../../model/sequelize/User");
const Game = require("../../model/sequelize/Game");
const Profile = require("../../model/sequelize/Profile");

exports.getGames = () => {
  return Game.findAll();
};

exports.getGameById = (gameId) => {
  return Game.findByPk(gameId, {
    include: [
      {
        model: Profile,
        as: "userProfiles",
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      },
    ],
  });
};

exports.createGame = (newGame) => {
  console.log(JSON.stringify(newGame));
  return Game.create({
    title: newGame.title,
    studio: newGame.studio,
	  publisher: newGame.publisher,
    shortDescription: newGame.shortDescription,
  });
};

exports.updateGame = (gameId, gameData) => {
  const title = gameData.title;
  const studio = gameData.studio;
  const publisher = gameData.publisher;
  const shortDescription = gameData.shortDescription;
  return Game.update(gameData, {
    where: { _id: gameId },
  });
};

exports.deleteGame = (gameId) => {
  return Game.destroy({
    where: { _id: gameId },
  });
};
