const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  loginController,
  signupController,
  authController,
  applyDoctorController,
  notificationController,
  deleteNotificationsController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController
} = require("../controllers/userController");
// router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//SIGNUP || POST
router.post("/signup", signupController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST

router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Get All Notification || POST
router.post("/all-notifications", authMiddleware, notificationController);

// Delete All Notification || POST
router.post("/delete-notifications", authMiddleware, deleteNotificationsController);

// GET All Doctors 
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// Book Appointment
router.post('/book-appointment', authMiddleware, bookAppointmentController);

// Booking Availabilty
router.post('/booking-availability', authMiddleware, bookingAvailabilityController);

// Appointment List
router.get('/user-appointments', authMiddleware, userAppointmentsController);


module.exports = router;
