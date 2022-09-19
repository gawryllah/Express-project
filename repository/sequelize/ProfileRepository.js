const Sequelize = require("sequelize");

const User = require("../../model/sequelize/User");
const Game = require("../../model/sequelize/Game");
const Profile = require("../../model/sequelize/Profile");
const e = require("express");

exports.getProfiles = () => {
  return Profile.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Game,
        as: "game",
      },
    ],
  });
};

exports.getProfileById = (profileId) => {
  return Profile.findByPk(profileId, {
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Game,
        as: "game",
      },
    ],
  });
};

exports.createProfile = (newProfile) => {
  console.log(JSON.stringify(newProfile));

   let gs;
   let md;

   if (newProfile.gameScore == ''){
     gs = null;
   } else{
     gs = newProfile.gameScore;
   }

   if (newProfile.mvpDate == ''){
     md = null;
   }else{
     md = newProfile.mvpDate;
   }



   console.log("kreatyna profil: " + gs)
  return Profile.create({
    user_id: newProfile.user_id,
    favGame_id: newProfile.favGame_id,
    title: newProfile.title,
    isPrivate: newProfile.isPrivate,
    desc: newProfile.desc,
    gameScore: gs,
    mvpDate: md
	
  });
};

exports.updateProfile = (profileId, data) => {
  return Profile.update(data, {
    where: { _id: profileId },
  });
};

exports.deleteProfile = (profileId) => {
  return Profile.destroy(
    { where: { _id: profileId }
  });
};

exports.deleteManyProfiles = (profilesIds) => {
  return Profile.find({ _id: { [Sequelize.Op.in]: profilesIds } });
};
