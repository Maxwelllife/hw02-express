// const { Conflict } = require("http-errors"); можна использовать если нет такой функции как RequestError
const { User } = require("../../models");
const { RequestError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  const { name, email, subscription, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const verificationToken = uuidv4();
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // если его еще нет то сохраняем в базе
  const result = await User.create({
    name,
    email,
    subscription,
    verificationToken,
    password: hashPassword,
  });
  // создаем письмо
  const mail = {
    to: email,
    subject: "Подтверждение email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`,
  };
  // отправляем письмо
  await sendEmail(mail);
  // res.status(201).json(
  //   {
  //   email: result.email,
  //     name: result.name,
  //   }
  // )
  res.status(201).json({
    status: "Created",
    code: 201,
    user: {
      email: result.email,
      name: result.name,
      subscription: result.subscription,
      verificationToken: result.verificationToken,
    },
  });
};

module.exports = signup;
