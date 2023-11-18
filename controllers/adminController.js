const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: `Users data list`,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching users`,
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: `Doctors data list`,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error while fetching doctors`,
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status}`,
      onclickPath: "/notification",
    });

    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: `Acount Status updated`,
      data: doctor,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in Account Status`,
      error,
    });
  }
};

const changeUserAccountStatusController = async (req, res) => {
  try {
     // const { userId, isActivate } = req.body;
    // console.log('iojidjddsjd ' +  JSON.stringify(record));
    // console.log('iojidjddsjd ' +  userId);
    const record = req.body.record;
    const userId = record._id;
    const isActivate = record.isActivate;
    const user = await userModel.findByIdAndUpdate(userId, { isActivate });
    const accStatus = isActivate === 'block' ? 'activate' : 'block';
    user.isActivate = isActivate === 'block' ? 'activate' : 'block';
    const notification = user.notification;
    notification.push({
      type: "user-account-status-updated",
      message: `Your User Account Has ${accStatus}`,
      onclickPath: "/notification",
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: `Account Status updated`,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Error in User Account Status`,
      error,
    });
  }
};

module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatusController,
  changeUserAccountStatusController,
};
