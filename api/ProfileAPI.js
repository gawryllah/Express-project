const ProfileRepository = require("../repository/sequelize/ProfileRepository");

exports.getProfiles = (req, res, next) => {
  ProfileRepository.getProfiles()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProfileById = (req, res, next) => {
  const profileId = req.params.profileId;
  ProfileRepository.getProfileById(profileId).then((user) => {
    if (!user) {
      res.status(404).json({
        message: "User with id: " + profileId + " not found",
      });
    } else {
      res.status(200).json(user);
    }
  });
};

exports.createProfile = (req, res, next) => {
  ProfileRepository.createProfile(req.body)
    .then((newProfile) => {
      res.status(201).json(newProfile);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProfile = (req, res, next) => {
  const profileId = req.params.profileId;
  ProfileRepository.updateProfile(profileId, req.body)
    .then((result) => {
      res.status(200).json({
        message: "Profile updated!",
        user: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteProfile = (req, res, next) => {
  const profileId = req.params.profileId;
  BugReportRepository.deleteBugReport(profileId)
    .then((result) => {
      res.status(200).json({
        message: "Profile deleted!",
        user: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
