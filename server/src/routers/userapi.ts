import 'dotenv/config';
import express, { Router, Request, Response } from 'express';
import * as UserController from '../controllers/UserController'

const userRoutes: Router = express.Router();

userRoutes.post('/status', UserController.getUserStatus);

userRoutes.post('/register', UserController.registerUser);

userRoutes.post('/login', UserController.loginUser);

userRoutes.post('/logout', UserController.logoutUser);

export default userRoutes;
