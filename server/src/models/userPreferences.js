// This model will be for the save user preferences
import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const preferencesSchema = new Schema(
  {
    countryCode: {
      // I need help figuring out how to implement the iso-2 coding (this is what will give the 2 letter country format.)
      type: String,
      // I am going to default to us as anyone looking at this will most likely be in the us.
      default: 'US',
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