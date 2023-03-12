import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

export const test = asyncHandler(async (req, res) => {
    let data = req.user
    try {
        res.json(data);
    
} catch (error) {
      throw new Error(error.message);
}
})