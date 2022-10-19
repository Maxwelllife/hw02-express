const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    RequestError(404, "not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.json({ message: "Verify success" });
};

module.exports = verifyEmail;
