import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import session from 'express-session';
import * as UserController from '../controllers/UserController'

const userRoutes: Router = express.Router();

userRoutes.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

userRoutes.get('/status', UserController.getUserStatus);

userRoutes.post('/register', UserController.registerUser);

userRoutes.post('/login', UserController.loginUser);

userRoutes.post('/logout', UserController.logoutUser);

export default userRoutes;
