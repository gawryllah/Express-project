const express = require('express');
const router = express.Router();

const profileController = require("../controllers/profileController");




router.get('/', profileController.showProfileList);

router.get('/add', profileController.showAddProfileForm);

router.get('/edit/:profileId', profileController.showEditProfileForm);

router.get('/details/:profileId', profileController.showProfileDetails);

router.post('/add', profileController.addProfile);

router.post('/edit/:profileId', profileController.updateProfile);

router.get('/delete/:profileId', profileController.deleteProfile);



module.exports = router;