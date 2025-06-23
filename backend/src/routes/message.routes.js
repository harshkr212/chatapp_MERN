import express from 'express'
import protectUser from '../middlewares/protectUser.js';
import { getUserSideBar,getMessage, sendMessage } from '../controllers/message.controllers.js';
const router=express.Router();
router.get('/getUser',protectUser,getUserSideBar)
router.get('/:id',protectUser,getMessage)
router.post('/send/:id',protectUser,sendMessage)
export default router