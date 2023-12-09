import express from 'express';
import bcrypt from "bcryptjs";
import { User } from '../models/user';
import { userAuth } from '../middleware/userAuth';


const router = express.Router();

router
  .route('/:user')
  .get(async (req, res) => {
    const { user } = req.params;

    
  })
  .post(async(req, res) => {

  })
  .put(async(req, res) => {

  })
  .delete(async(req, res) => {

  })