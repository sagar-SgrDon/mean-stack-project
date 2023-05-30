const User = require("../models/user");
const bcrypt = require("bcryptjs");

function getUser(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(async (user) => {
      // console.log(password, user.password);
      if (!user) {
        return res.status(404).json({ message: "No user found" });
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        return res
          .status(400)
          .json({ message: "Invalid password, Please try again" });
      }

      res
        .status(200)
        .json({ message: "Login Successful", userId: user._id.toString() });
    })
    .catch((err) => {
      console.log("User not found", err);
    });
}

async function createUser(req, res, next) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Email-id already exists" });
    }
    const hashedPwd = await bcrypt.hash(password, 12);

    const user = new User({ name, email, password: hashedPwd });

    await user.save();
    res.status(201).json({ message: "User created successful" });
  } catch (err) {}
}

module.exports = { getUser, createUser };
