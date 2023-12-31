import pkg from "bcryptjs";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  let user;
  try {
    user = await User.findById(id).populate("posts");
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No user found" });
  }

  return res.status(200).json({ user });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim === "" || !email || email.trim() === "" || !password) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  const { hashSync } = pkg;
  const hashedPassword = hashSync(password);

  let user;
  try {
    user = new User({ email, name, password: hashedPassword });
    await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(201).json({ user, message: "Account Created Succesfully" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email.trim() === "" && password.length < 6) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "SignUp First" });
  }

  const { compareSync } = pkg;
  const isPasswordCorrect = compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Email or Password" });
  }

  return res
    .status(200)
    .json({ id: existingUser._id, message: "Logged In Successfully" });
};
