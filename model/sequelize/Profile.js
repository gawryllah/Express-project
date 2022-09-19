const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Profile = sequelize.define("Profile", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
	isPrivate: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate:{
      notEmpty: {
        msg: "Pole jest wymagane"
    },
      isNumeric: {
        msg: "W polu musi znajodwać się liczba z zakresu 0 (false) 1 (true)",
        min: 0,
        max: 1
      }
    }
  },
 
	mvpDate: {
    type: Sequelize.DATE,
    allowNull: true,
    validate:{
      
      isDate: {
        msg: "W polu musi znajodwać się data"
      }
    }
  },
    desc: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
    gameScore: {
    type: Sequelize.FLOAT(3),
    allowNull: true,
    validate: {

        is: /^(\s*|\d+)$/i
      /*
      allowNull: true,
        isNumeric:  {
          msg: "W polu musi być typ liczbowy"
        },
        min: 1,
        max: 10
        */
    }
  },
	favGame_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
	user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Profile;
