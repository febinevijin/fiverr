import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async (req, res, next) => {
  let { userToken } = req.cookies;

  if (userToken) {
    try {
      console.log("1");
      //decodes token id
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      //   return req.user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
