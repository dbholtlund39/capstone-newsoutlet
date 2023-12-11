import mongoose from 'mongoose';
const{ Schema, model } = mongoose;

const userSchema = new Schema (
  {
    username: {
      type: String,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      reuired: true,
      set: toLower,
      pattern: "[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]",
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
    preferences: [
      {
        countryCode: {
          type: String,
          // I am going to default to us as anyone looking at this will most likely be in the us.
          default: 'US',
          minLength: 2,
          maxLength: 2,
          require: true,
        }
      },
      {
        team: {
          type: String,
          sport: {
            type: String,
          },
          require: false,
        }
      },
      {
        interest: {
          type: String,
          require: false,
        }
      }
    ],
  }
);

const User = model("User", userSchema);

export default User;