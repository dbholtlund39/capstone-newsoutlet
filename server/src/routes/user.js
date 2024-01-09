import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const userData = req.body;

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }

    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.route("/signin").post(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

router
  .route("/:username")
  .get(async (req, res) => {
    const { username } = req.params;

    try {
      const user = await User.findOne({ username })
        .populate("name", "firstName lastName")
        .populate("location", "Country City State")
        .populate("favoriteTeams");

      if (!user) {
        return res.sendStatus(404);
      }

      res.json(user.toJSON());
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .patch(async (req, res) => {
    const { username } = req.params;
    const changes = req.body;

    let user = await User.findOne({ username });

    if (user) {
      Object.assign(user, changes);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
router.route("/:user").delete(async (req, res) => {
  const { user } = req.params;
  console.log("Deleting user:", user);
  const deleteUser = await User.findOneAndDelete({ username: user });

  if (!deleteUser) {
    return res.sendStatus(404);
  }

  res.json(deleteUser);
});

export default router;
