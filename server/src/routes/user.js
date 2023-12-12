import express from 'express';
import { User } from '../models/user';

const router = express.Router();

router
  .route('/:user')
  .get(async (req, res) => {
    const { username } = req.params;

    const populateQuery = [
      {
        path: "username",
        populate: "username"
      },
      {
        path: "name",
        populate: {select: ['firstName', 'lastName']}
      },
      {
      path: "preferences",
      populate: {select: ['countryCode', 'team', 'interest']}
      }
    ]

    const user = await User.findOne({username}).populate(populateQuery);

    if(user === null){
      return res.sendStatus(404);
    }

    res.json(user.toJSON());
  })
  .put(async(req, res) => {
    const { username, email, name, password, location, team, interest } = req.body;
  })
  .delete(async(req, res) => {
    const { username } = req.body;
    const deleteUser = await User.findOneAndDelete(username);

    if(!deleteUser){
      return res.sendStatus(404);
    }

    res.json(deleteUser);
  })

  module.exports = router; 