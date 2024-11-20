import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import session from 'express-session';
import * as UserController from '../controllers/UserController'

const userRoutes: Router = express.Router();

userRoutes.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: true,
    httpOnly: true,
    sameSite: 'none'
  }
}));

userRoutes.post('/status', UserController.getUserStatus);

userRoutes.post('/register', UserController.registerUser);

userRoutes.post('/login', UserController.loginUser);

userRoutes.post('/logout', UserController.logoutUser);

export default userRoutes;
