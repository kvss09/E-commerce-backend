import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserModel = new userModel();
export const SignUp = async (req, res) => {
  const userDetails = req.body;
  console.log(userDetails);
  try {
    const { firstName, lastName, email, password, mobile, address, pin } =
      req.body;
    // database operations to save user details here
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    const data = new userModel(
      firstName,
      lastName,
      email,
      hashedPassword,
      mobile,
      address,
      pin
    );
    const isUserPresent = await UserModel.isUser(data);
    if (isUserPresent) {
      return res.status(409).json({ message: "User already exists" });
    }
    const result = await UserModel.addUser(data);
    if (!result) {
      return res.status(400).json({ message: "Failed to create user" });
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send(
      json.stringfy({
        success: false,
        message: "Username and password are required.",
      })
    );
  }
  try {
    const user = await UserModel.getUser(email);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send(
          json.stringfy({ success: false, message: "Invalid credentials." })
        );
    }
    const SECRET_KEY =
      "0728446f298657fe1270df9a8baf713172049f6a794a91bddf561928b64687217f74f5ad608f0073b1eec81b8b584ff709204a02a8d0c91d2cab5d3a6d7b4cb4c55fa6471ee6feb2bc437644071f64bbbc75b9b14e28831ef6e3723317a2c201ad8ce04e136d45ef359cbde9394d060b288a04e795925156054697dc656bc2e3a415c440e4edda4953b36803e2a0fde9534b4b822631a299016085eca85c1ac3909081d908d55822e4a8a9a60408b593abe703dfb26fa67b6c3878aa20aa5a4e6a0d4a37dcba9de1e0eee9455cdef17468fcb3831683e6209e727da940b3007bb77bc94b096f96a034c53358d48c9ef7684590fa679f4674f339e286a39b2d25e10ce4e98aac39534df432783a8b59d9738c98bb44e533da3e3819f73de15911940a6f2b46890f5f7edf76ac2154aa0b44e47b18d037843eb9c65e9e563237e016dd270bcd5d2d4376538ef8e8befb533ae29e7f7be4257944fccd9ee435c7ee647509e7267855b2e9fd40242be7da7814a12751d1f17a19d6afcaaf931d2b1aae254d4c965071f9e27f12c42b818a271ade8305db95d9bccc67bc520a82a2964a65a8fbe461e858167c4b06ba1cb0a3c44ae2fcfbdcd6a605e90a1b0f601a322d831d43625e908820f53ebf6e4d1ae1c4e73a5058a3a0f58132f3429a6f6a52eccd5ba61d4702fb2e80a6f1eac246718f44c410d7c9f4ba952c3d14e15df161";
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    console.log(token);
    return res
      .status(200)
      .json({ success: true, message: "User signed in successfully" });
    // res.status(200).json({ message: "User signed in successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const Logout = (req, res) => {
  try {
    res.clearCookie("auth_token");
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
