const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

// signup controller
const signupController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email }); // Check existing user
    if (existingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }

    // Hash password with a specified number of rounds
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    // Create a new user
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "User Signup Successful", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: `Signup controller ${error.message}` });
  }
};

// Sign in controller
const loginController = async (req, res) => {
  try {
    //check user
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({ message: "User not found", success: false });
    }

    // compare password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JSON_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .send({ message: "Login Successfully", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Signin controller ${error.message}`,
    });
  }
};

// Auth CONTROLLER

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `auth Error`,
      error,
    });
  }
};

// Apply Doctor Controller

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true }); // find admin
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has apply for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification }); // update notifications of admin
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while appling for Doctor`,
      error,
    });
  }
};

// Get Notification controller
const notificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId }); // get user
    const seennotification = user.seennotification;
    const notification = user.notification;
     seennotification.push(...notification); // push notifications in seennotification
    user.notification = [];
    // user.seennotification = notification;
    user.seennotification = seennotification;
    const updatedUser = await user.save();
    res.status(200).send({
      message: "all notification marked as read",
      success: true,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Notifications`,
      error,
    });
  }
};

// Delete Notification controller
const deleteNotificationsController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: " notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `unable to delete all Notifications`,
      error,
    });
  }
};

// GET ALL DOCTORS

const getAllDoctorsController = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status: "approved" })
    res.status(200).send({
      success: true,
      message: `Doctors list Fetched Successfully`,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching Doctors`,
      error,
    });
  }
};

// BOOK APPOINTMENT CONTROLLER
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: `New-appointment-request`,
      message: `A New Appointment Request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: `Appointment Booked Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error While Booking Appointment`,
      error,
    });
  }
};

// BOOKING AVAILABILITY CONTROLLER

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    console.log("---- fromTime" + fromTime);
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    console.log("---- toTime" + toTime);
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: `Appointment not Available at this time`,
        success: false,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: `Appointment Available`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error While Check Availability`,
      error,
    });
  }
};

// userAppointmentsController

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    
    res.status(200).send({
      success: true,
      message: `User Appointments Fetch Successfully`,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error While Fetching User Appointments`,
      error,
    });
  }
};
module.exports = {
  loginController,
  signupController,
  authController,
  applyDoctorController,
  notificationController,
  deleteNotificationsController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
};
