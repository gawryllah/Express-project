const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const User = sequelize.define("User", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
    userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "Pole jest wymagane"
      },
      len: {
          args: [2,60],
          msg: "Pole powinno zawierać od 2 do 60 znaków"
      },
    }
  
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  email: {
    type: Sequelize.STRING(25),
    allowNull: false,
    unique: true,
    validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [5,25],
                msg: "Pole powinno zawierać od 5 do 25 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
          }
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
    
  },
    lastLogged: {
    type: Sequelize.DATE,
    allowNull: true,
    validate:{
      
      isDate: {
        msg: "W polu musi znajodwać się data"
      }
     
    }
  },
});

module.exports = User;
