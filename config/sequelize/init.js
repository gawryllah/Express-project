const sequelize = require("./sequelize");

const User = require("../../model/sequelize/User");
const Game = require("../../model/sequelize/Game");
const Profile = require("../../model/sequelize/Profile");

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');


module.exports = () => {
  User.hasMany(Profile, {
    as: "userProfiles",
    foreignKey: { name: "user_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Profile.belongsTo(User, {
    as: "user",
    foreignKey: { name: "user_id", allowNull: false },
  });

  Game.hasMany(Profile, {
    as: "userProfiles",
    foreignKey: { name: "favGame_id", allowNull: false },
    constraints: true,
    onDelete: "CASCADE",
  });
  Profile.belongsTo(Game, {
    as: "game",
    foreignKey: { name: "favGame_id", allowNull: false },
  });

  let allUsers, allGames;
  return sequelize
    .sync({ force: true })
    .then(() => {
      return User.findAll();
    })
    .then((users) => {
      if (!users || users.length == 0) {
        return User.bulkCreate([
          { userName: "Streamer1", email: "streamer1@twitch.tv", country: "Poland" , lastLogged: "2022-01-02T22:00", password: passHash},
          { userName: "JohnnyK", email: "abc@gmail.com", country: "Germany", password: passHash },
          { userName: "Ben10", email: "Ben10@gmail.com", country: "USA", lastLogged: "2022-01-10T10:23", password: passHash },
          { userName: "catfIsh", email: "catlover@outlook.com", password: passHash },
        ]).then(() => {
          return User.findAll();
        });
      } else {
        return users;
      }
    })
    .then((users) => {
      allUsers = users;
      return Game.findAll();
    })
    .then((games) => {
      if (!games || games.length == 0) {
        return Game.bulkCreate([
          {
            title: "COUNTER-STRIKE: GLOBAL OFFENSIVE",
            studio: "Valve",
			publisher: "Valve" ,
			shortDescription: null,
          },
          {
            title: "RED DEAD REDEMPTION 2",
            studio: "Rockstar Games",
			publisher: "Rockstar Games" ,
			shortDescription: " America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs." ,
          },
          {
            title: "CYBERPUNK 2077",
            studio: "CD Projekt Red Studio",
			publisher: "Warner Bros. Interactive Entertainment, CD Projekt Red Studio" ,
			shortDescription: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
          },
          {
            title: "THE MEDIUM",
            studio: "Bloober Team",
			publisher: "Bloober Team" ,
			shortDescription: "Become a medium living in two different worlds: the real one and the spirit one.", 
          },
        ]).then(() => {
          return User.findAll();
        });
      } else {
        return games;
      }
    })
    .then((games) => {
      allGames = games;
      return Profile.findAll();
    })
    .then((profiles) => {
      if (!profiles || profiles.length == 0) {
        return Profile.bulkCreate([
          {
            user_id: allUsers[0]._id,
            favGame_id: allGames[0]._id,
            mvpDate: "2017-01-01",
			isPrivate: 1,
			gameScore: 10,
			desc: "Hi, it's ur idol!" ,
          },
          {
            user_id: allUsers[1]._id,
            favGame_id: allGames[1]._id,
            mvpDate: "2010-02-02",
			isPrivate: 0,
			gameScore: 8,
			desc: "Hi, it's JohnnyK!" ,
          },
          {
            user_id: allUsers[2]._id,
            favGame_id: allGames[2]._id,
            mvpDate: null,
			isPrivate: 1,
			gameScore: 6,
			desc: "Hi, it's Ben10!" ,
          },
          {
            user_id: allUsers[3]._id,
            favGame_id: allGames[3]._id,
            mvpDate: "2017-08-25",
			isPrivate: 1,
			gameScore: 7,
			desc: "Hi, it's catfIsh!" ,
          },
        ]);
      } else {
        return profiles;
      }
    });
};
