const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Game = sequelize.define("Game", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Pole jest wymagane"
      },
      len: {
          args: [5,100],
          msg: "Pole powinno zawierać od 5 do 100 znaków"
      }
    }
  },
  studio: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  publisher: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  shortDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Game;
