const User = require("../../model/sequelize/User");
const Game = require("../../model/sequelize/Game");
const Profile = require("../../model/sequelize/Profile");
const { use } = require("../../routes");

exports.getUsers = () => {
  return User.findAll();
};

exports.getUserById = (userId) => {
  return User.findByPk(userId, {
    include: [
      {
        model: Profile,
        as: "userProfiles",
        include: [
          {
            model: Game,
            as: "game",
          },
        ],
      },
    ],
  });
};

exports.createUser = (newUser) => {
  console.log(JSON.stringify(newUser));
  return User.create({
    userName: newUser.userName,
    email: newUser.email,
	  country: newUser.country,
	  lastLogged: null
  });
};

exports.updateUser = (userId, userData) => {
  console.log(userId);
  console.log(userData);
  const userName = userData.userName;
  const email = userData.email;
  const country = userData.country;
  const lastLogged = userData.lastLogged;
  return User.update(userData, {
    where: { _id: userId },
  });
};

exports.deleteUser = (userId) => {
  return User.destroy({
    where: { _id: userId },
  });
};

exports.findByEmail = (email) => {
  

  return User.findOne({
    where: {email: email}
  });

 
}

