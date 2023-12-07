import mongoose from 'mongoose';
const{ Schema, model } = mongoose;

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      min: 5,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: false,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      max: 20,
      // I want to find a way to set the requirement for upper case, lower case, number, and special character in here. I might have to look back
      // at a previous assignment to remember how it's done
    },
    location: {
      required: true,
      country: {
        type: String,
      },
      state_Territory: {
        type: String,
        // I have it set as state and teritory for the hypothetical non US user.
      },
      city: {
        type: String,
        required: false,
        // I think for the users who don't want too much of their data given could stop at state level.
      }
    }
  }
);

const User = model("User", userSchema);

export default User;