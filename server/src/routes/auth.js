import express from express;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();
  
// This will be to sign up a new user
router.post('/signup', async(req, res) => {
  const { username, email, password, name, location, team, interest } = req.body;
    
  if(!username || !email || !password || !name || !location){
    return res.status(422).json({ error: 'Please fill out required fields.' })
  }

  /* I Think I was close with this one but I think I need to break it into two functions 
  based on username and one for email. Keeping this here just incase I need to go back to this. */
  // User.find({ $or: [{username: username}, {email: email}] }, 
  //   function(err, user){
  //     if(err){
  //       return res.status(409).json({ error: 'Unable to signup.'})
  //     }

  //     if()
  //   })

  User.findOne({ username: username })
    .then((takenUsername) => {
      if(takenUsername){
        return res.status(409).json({ error: 'Username is already taken.'})
      }
  })
    
  User.findOne({ email: email })
    .then((takenEmail) => {
      if(takenEmail){
        return res.status(409).json({ error: 'Email is already taken.' })
      }
    })
});

router.post('/signin', async (req, res) => {

});