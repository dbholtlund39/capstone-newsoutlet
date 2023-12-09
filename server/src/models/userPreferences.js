// This model will be for the save user preferences
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const preferencesSchema = new Schema(
  {
    countryCode: {
      type: String,
      // I am going to default to us as anyone looking at this will most likely be in the us.
      default: 'US',
      minLength: 2,
      maxLength: 2,
      require: true,
    },
    team: {
      type: String,
      sport: {
        type: String,
      },
      require: false,
    },
    interest: {
      type: String,
      require: false,
    }
  }
)