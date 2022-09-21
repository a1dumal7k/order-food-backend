const { Op } = require("sequelize");
const catchAsync = require("../utilts/catchAsync");
const { compare } = require("bcryptjs");
const User = require("../models/User");
const Cart = require("../models/Cart");
const AppError = require("../utilts/AppError");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generalToken = (payload, jwtSecurity, option) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecurity, option, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const validatorErrors = validationResult(req);
  if (!validatorErrors.isEmpty()) {
    const err = new AppError("Validation Error");
    err.name = "validationError";
    err.isOperational = false;
    err.errros = validatorErrors.errros;
    return next(err);
  }

  const { username, role } = req.body;
  const existedUser = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });

  if (existedUser) {
    return next(new AppError("bunday foydalanuvchi tizimda mavjud", 409));
  }

  const countSuperAdmin = await User.findAndCountAll({
    where: { role: "SUPER_ADMIN" },
  });
  if (
    countSuperAdmin.count > 1 &&
    (role === "SUPER_ADMIN" ||
      role === "ORDER_ADMIN" ||
      role === "ADMIN" ||
      role === "DELIVERE")
  ) {
    return next(
      new AppError(
        `registratsiyadan faqat bitta Super_Admin o\`tishi mumkin`,
        400
      )
    );
  }
  const newUser = await User.create(req.body);

  if (newUser.role === "CUSTOMER") {
    await Cart.create({ customerId: newUser.id });
  }
  const createToken = await generalToken(
    {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS512", expiresIn: "24h" }
  );

  res.status(201).json({
    status: "succesfull",
    message: "Yangi foydalanuvchi qo`shildi",
    errors: null,
    data: {
      firstname: newUser.firstName,
      lastName: newUser.lastName,
      username: newUser.username,
      role: newUser.role,
      jwt: createToken,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const validatonErrors = validationResult(req);
  if (!validatonErrors.isEmpty()) {
    let err = new AppError("Validation Error", 400);
    err.name = "ValidationError";
    err.isOperational = false;
    err.errors = validatonErrors.errors;
    return next(err);
  }
  const { username, password } = req.body;

  const existedUser = await User.findOne({
    where: { username: { [Op.eq]: username } },
  });
  if (!existedUser) {
    return next(new AppError("Login yoki password noto`gri", 400));
  }
  const passwordIsMatch = compare(password, existedUser.password);
  if (!passwordIsMatch) {
    return next(new AppError("Login yoki password noto`gri", 400));
  }

  const createToken = await generalToken(
    {
      id: existedUser.id,
      firstName: existedUser.firstName,
      lastName: existedUser.lastName,
      role: existedUser.role,
    },
    process.env.JWT_SECRET,
    { algorithm: "HS512", expiresIn: "24h" }
  );

  res.status(201).json({
    status: "succesfull",
    message: `${existedUser.role} tizimga kirdi`,
    errors: null,
    data: {
      user: {
        firstName: existedUser.firstName,
        lastName: existedUser.lastName,
        role: existedUser.role,
        jwt: createToken,
      },
    },
  });
});
