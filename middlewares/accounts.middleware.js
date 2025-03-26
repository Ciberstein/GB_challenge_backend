const AppError = require("../utils/appError");
const Account = require("../models/accounts.model");
const hashPassword = require("../utils/hashPassword");
const catchAsync = require("../utils/catchAsync");
const { generateJWT } = require("../utils/jwt");

exports.validRegisterAccount = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const account = await Account.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (account) {
    next(new AppError("This email already registered", 401));
  }

  next();
});

exports.validExistAccount = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const account = await Account.findOne({
    where: { email: email.toLowerCase() },
    attributes: ["id", "email", "status"],
  });

  if (!account) {
    next(new AppError(`Account not found`, 401));
  }

  req.account = account;
  next();
});

exports.createAccount = catchAsync(async (req, res, next) => {
  const { email, password, first_name, last_name, email_verified = false } = req.body;

  let webName;
  let username;

  do {
    username = `user_${Math.floor(100000 + Math.random() * 900000)}`;

    webName = await Account.findOne({
      where: { username },
    });
  } while (webName);

  const create = await Account.create({
    status: email_verified ? "active" : "pending",
    username,
    first_name, 
    last_name,
    password: hashPassword(password),
    email: email.toLowerCase(),
    attributes: ["id", "email", "status"],
  });

  if (!create) {
    next(new AppError("Error on register", 500));
  }

  const account = await Account.findOne({
    where: {
      id: create.id
    },
    attributes: ["id", "email", "status"],
  });

  if (email_verified) {
    return res.status(201).json({
      status: "success",
      message: "Account has been created",
      account,
    });
  }

  req.account = account;

  next();
});

exports.validLoginAccount = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { account } = req;

  const auth = await Account.findOne({
    where: {
      email: account.email,
      password: hashPassword(password),
    },
  });

  if (!auth) {
    next(new AppError("Authentication error", 401));
  }

  next();
});

exports.accountVerify = catchAsync(async (req, res, next) => {
  const { account } = req;

  if (account.status === "active") {
    const token = await generateJWT(account.id);

    return res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain: process.env.FRONTEND_DOMAIN, 
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000
    }).status(200).json({
      status: "success",
      message: "Account has been logged",
      account
    });
  }

  else if(account.status === "disabled") {
    return next(new AppError("Account disabled", 401));
  }

  next();
});

exports.validAuthCodeReceipt = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const account = await Account.findOne({
    where: { email },
    attributes: ["id", "email", "status"],
  });

  if (!account) {
    next(new AppError(`Account with email: ${email} not found`, 404));
  }

  req.email = account.email;
  req.account = account;

  next();
});

exports.passwordsMatch = catchAsync(async (req, res, next) => {
  const { password, password_repeat } = req.body;

  if (password !== password_repeat) {
    next(new AppError("Passwords do not match", 401));
  }

  next();
});

exports.emailsValidations = catchAsync(async (req, res, next) => {
  const { new_email, new_email_repeat } = req.body;
  const { sessionAccount } = req;

  const account = await Account.findOne({
    where: {
      email: new_email.toLowerCase(),
    },
  });

  if (account) {
    next(new AppError("Correo electrónico en uso", 401));
  }

  if (new_email !== new_email_repeat) {
    next(new AppError(`Los emails no coinciden`, 401));
  }

  if (new_email === sessionAccount.email) {
    next(
      new AppError(`La nueva direccion de correo debe ser diferente a la actual`, 401)
    );
  }

  req.email = new_email;
  req.account = sessionAccount;

  next();
});

exports.updatePasword = catchAsync(async (req, res, next) => {
  const { password, new_password, new_password_repeat } = req.body;
  const { sessionAccount } = req;

  if (sessionAccount.password !== hashPassword(password)) {
    return next(new AppError("Wrong password", 401));
  }

  if (new_password !== new_password_repeat) {
    return next(new AppError("New Passwords do not match", 401));
  }

  req.account = sessionAccount;

  next();
});

