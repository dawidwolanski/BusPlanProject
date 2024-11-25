import express, { Router, Request, Response } from 'express';
import * as RestrictedController from '../controllers/RestrictedController';
import { checkRole } from '../middleware';
import { UserType } from 'shared/Interfaces/User';

const restrictedRouter: Router = express.Router();



restrictedRouter.get('/panel', checkRole(UserType.CASUAL));




export default restrictedRouter;
