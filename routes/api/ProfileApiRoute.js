const express = require("express");
const router = express.Router();

const profileApiController = require("../../api/ProfileAPI");

router.get("/", profileApiController.getProfiles);
router.get("/:profileReportId", profileApiController.getProfileById);
router.post("/", profileApiController.createProfile);
router.put("/:profileId", profileApiController.updateProfile);
router.delete("/:profileId", profileApiController.deleteProfile);

module.exports = router;
