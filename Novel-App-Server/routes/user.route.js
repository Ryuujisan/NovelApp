import express from 'express';
import { login, register, check, update } from '../controllers/user.controller.js';
import {checkAuth} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", checkAuth, login)

router.post("/register", register)

router.get('/check', checkAuth, check)

router.put("/updateProfile", checkAuth, update)

export default router;