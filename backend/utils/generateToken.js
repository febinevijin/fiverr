import jwt from "jsonwebtoken";

const generateToken = (id,isSeller) => {
  return jwt.sign({ id, isSeller }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

export default generateToken;
