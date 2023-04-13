import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";

export const register = asyncHandler(async (req, res) => {
  const { file, ...data } = req.body;

  let userData = data.user;

  const email = req.body.email;
  const userExist = await User.findOne({ email: email });
  console.log(userExist);
  if (userExist) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }

  let profile = await cloudinary.v2.uploader.upload(file, {
    folder: "profileImages",
  });
  if (!profile) throw new Error(error);

  const user = await User.create({
   ...userData,
    img: {
      profile_id: profile.public_id,
      profile_url: profile.secure_url,
    },
  });
  if (user) {
    res.status(200).json({
      msg: "User created successfully",
      status: true,
    });
  } else {
    res.status(404);
    throw new Error("failed to create user");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("failed to get email");
  }

  if (user && (await user.matchPassword(password))) {
    let token = generateToken(user._id, user.isSeller);
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true,
    };
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).cookie("userToken", token, options).json({
      // _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      img: user.img.profile_url,
      country: user.country,
      isSeller: user.isSeller,

      // token: generateToken(user._id, user.isSeller),
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
