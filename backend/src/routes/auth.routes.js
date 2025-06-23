import express from "express"
import { login, logout, signup,updateProfile } from "../controllers/auth.controllers.js";
import protectUser from "../middlewares/protectUser.js";

const router=express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.get('/logout',logout)

router.put('/update-profile',protectUser,updateProfile)

router.get('/checkUser',protectUser,checkAuth);

export default router;