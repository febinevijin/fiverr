import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

export const register = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }
  const user = await User.create(req.body);
  if (user) {
    let token = generateToken(user._id, user.isSeller);
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true,
    };
    res.status(200).cookie("userToken", token, options).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      country: user.country,
    });
  } else {
    res.status(404);
    throw new Error("failed to create user");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    let token = generateToken(user._id, user.isSeller);
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true,
    };
    res
      .status(200)
      .cookie("userToken", token, options)
      .json({
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        token: generateToken(user._id, user.isSeller),
      });
  } else {
    res.status(404);
    throw new Error("invalid Email or password");
  }
});

export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("userToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
});
