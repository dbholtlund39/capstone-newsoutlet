import express from 'express';
import bcrypt from "bcryptjs";
import { User } from '../models/user';
import { userAuth } from '../middleware/userAuth';


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
  .post(async(req, res) => {

  })
  .put(async(req, res) => {

  })
  .delete(async(req, res) => {

  })