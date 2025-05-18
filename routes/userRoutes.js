//userRoutes.js
import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/AuthMiddleware.js';
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser)
userRouter.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user })
})
export default userRouter;