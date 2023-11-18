const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  changeUserAccountStatusController,
} = require("../controllers/adminController");

// router object
const router = express.Router();

// Get || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// Get || Doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// POST || Account Status
router.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

// POST || Account Status
router.post("/changeUserAccountStatus", authMiddleware, changeUserAccountStatusController);


module.exports = router;