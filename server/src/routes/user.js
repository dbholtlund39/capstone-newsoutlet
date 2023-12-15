import express from "express";
import User from "../models/user";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router
  .route("/:user")
  .get(async (req, res) => {
    const { username } = req.params;

    const populateQuery = [
      {
        path: "username",
        populate: "username",
      },
      {
        path: "name",
        populate: { select: ["firstName", "lastName"] },
      },
      {
        path: "preferences",
        populate: { select: ["countryCode", "team", "interest"] },
      },
    ];

    const user = await User.findOne({ username }).populate(populateQuery);

    if (user === null) {
      return res.sendStatus(404);
    }

    res.json(user.toJSON());
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
  const deleteUser = await User.findOneAndDelete({ username: user });

  if (!deleteUser) {
    return res.sendStatus(404);
  }

  res.json(deleteUser);
});

export default router;
