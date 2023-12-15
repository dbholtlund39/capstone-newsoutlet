import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
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
      maxLength: 20,
    },
    preferences: [
      {
        countryCode: {
          type: String,
          default: 'US',
          minLength: 2,
          maxLength: 2,
          required: true,
        }
      },
      {
        team: {
          type: String,
          sport: {
            type: String,
          },
          required: false,
        }
      },
      {
        interest: {
          type: String,
          required: false,
        }
      }
    ],
  }
);

const User = model("User", userSchema);

export default User;