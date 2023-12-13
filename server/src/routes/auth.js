import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import { DB_URL } from "../config/db.config";

const router = express.Router();
  
// This will be to sign up a new user
router.post('/signup', async(req, res) => {
  const { username, email, name, password, location, team, interest } = req.body;
    
  if(!username || !email || !password || !name || !location){
    return res.status(422).json({ error: 'Please fill out required fields.' })
  }

  /* I Think I was close with this one but I think I need to break it into two functions 
  based on username and one for email. Keeping this here just incase I need to go back to this. After enough testing,
  I will remove this if not needed. */
  // User.find({ $or: [{username: username}, {email: email}] }, 
  //   function(err, user){
  //     if(err){
  //       return res.status(409).json({ error: 'Unable to signup.'})
  //     }

  //     if()
  //   })

  User.findOne({ $or: [{username: username}, {email: email}] })
    .then((takenUsername, takenEmail) => {
      if(takenUsername){
        return res.status(409).json({ error: 'Username is already taken.'})
      } else if(takenEmail){
        return res.status(409).json({ error: 'Email is already taken.'})
      }

      // For the sake of speed we could potentially change the salt to 10 as this doesn't need to be the most secure project.
      bcrypt.hash(password, 12).then((hashPassword) => {
        const user = new User({
          username,
          email,
          password: hashPassword,
          name,
          location,
          team,
          interest,
        })

        user.save()
        .then((user) => {
          res.status(200).json({ message: 'New User Saved.'})
        })
        .catch((err) => {
          // this catch is for if the database could not save the new user. 
          console.log(err);
        })
      })
  })
  .catch((err) => {
    // this catch should be if there is an issue in the process of the user.findone. With testing I hope to see it work that way.
    console.log(err)
  });
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password){
    res.status(422).json({ error: 'Missing username or password.'})
  }

  const user = await User.findOne({ username: username })
  const passwordMatch = user === null ? false : await bcrypt.compare(password, user.password);

  // I was thinking of setting it to (!username && !passwordMatch) but I think it would error out only if both were false rather than if one or the other is wrong.
  if(!(username && passwordMatch)){
    return res.status(401).json({ error: 'Invalide username or password.'})
  }
});

module.exports = router;