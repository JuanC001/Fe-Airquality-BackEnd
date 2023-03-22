import { response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const userController = {};

