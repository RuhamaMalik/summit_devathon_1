const express = require('express');
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateDoctorInfoController,
  getDoctorByIdController,
  DoctorAppointmentsCotroller,
  updateStatusController,
} = require("../controllers/doctorController");

const router = express.Router();

// Post SINGLE DOCTOR INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// Post Update DOCTOR INFO
router.post(
  "/updateDoctorProfileInfo",
  authMiddleware,
  updateDoctorInfoController
);

/// POST || GET SINGLE DOCTOR INFO
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

/// GET || Appointments
router.get("/doctor-appointments", authMiddleware, DoctorAppointmentsCotroller);

//POST UPDATE STATUS
router.post('/update-status', authMiddleware, updateStatusController);

module.exports = router;
