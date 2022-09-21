const User = require("../models/User");
const catchAsync = require("../utilts/catchAsync");
const AppError = require("../utilts/AppError");
exports.getUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.findAndCountAll();
  if (!allUsers) {
    next(new AppError("Not Found users list", 404));
  }
  res.status(200).json({
    status: "succesfull",
    message: "",
    error: "",
    data: {
      allUsers,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  if (!newUser) {
    return next(new AppError("neww User not Found", 500));
  }
  res.status(204).json({
    status: "succesfull",
    message: "User created",
    error: "",
    data: {
      newUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userById = await User.findByPk(id);
  if (!userById) {
    return next(new AppError("Not found ID" + id, 404));
  }
  userById.destroy();
  res.status(203).json({
    status: "succesfull",
    message: "User deleted",
    error: "",
    data: null,
  });
});
