const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");
const appointmentModel = require("../models/appointmentModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor Data Fetch Successully",
      data: doctor,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Fetching Doctor Details`,
      error,
    });
  }
};

const updateDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      {
        userId: req.body.userId,
      },
      req.body
    );

    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Doctor Profile Updated issue`,
      error,
    });
  }
};

// getDoctorByIdController
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: `Single Doctor Info Fetched`,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Erro in Single Doctor Info`,
      error,
    });
  }
};

// DoctorAppointmentsCotroller

const DoctorAppointmentsCotroller = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    console.log("----- appointments" + JSON.stringify(req.body));
    res.status(200).send({
      success: true,
      message: `Doctor Appoinment Fetch Successfully`,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Erro in  Doctor Appointments`,
      error,
    });
  }
};

// updateStatusController

const updateStatusController = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: `status-updated`,
      message: `Your appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: `Appointment Status Updated`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Erro in  Update Status`,
      error,
    });
  }
};
module.exports = {
  getDoctorInfoController,
  updateDoctorInfoController,
  getDoctorByIdController,
  DoctorAppointmentsCotroller,
  updateStatusController,
};
