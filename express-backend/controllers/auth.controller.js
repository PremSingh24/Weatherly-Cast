import { Users } from "../models/user.model.js";

export const authenticateUserHandler = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId);
    if (user) {
      res
        .status(200)
        .json(json({ city: user.favCity || [] }))
        .end();
    } else {
      res.status(404).json({ message: "Invalid User, Try to Login Again" });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

export const registerUserHandler = async (req, res) => {
  const { username, password } = req.body;

  try {
    //check if username already exists in DB
    console.log("username ", req.body);

    const usernameTaken = await Users.findOne({
      username: username,
    });

    if (usernameTaken) {
      res.status(409).json({ message: "Username Already Exists" }).end();
    } else {
      const newUser = new Users({ username, password });
      await newUser.save();
      const token = jwt.sign({ userId: newUser.id }, SecretKey, {
        expiresIn: "1h",
      });
      res.status(201).json({ message: "User Created successfully", token });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};

export const loginUserHandler = async (req, res) => {
  const loginUser = req.body;

  try {
    const user = await Users.findOne({
      username: loginUser.username,
    });

    if (user) {
      if (loginUser.password === user.password) {
        const token = jwt.sign({ userId: user.id }, SecretKey, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      res.status(401).json({ message: "Invalid Username" });
    }
  } catch (error) {
    if (error.message) {
      res.status(406).json({ message: error.message }).end();
    } else {
      res.status(500).json({ message: "Something Went Wrong" });
    }
  }
};
