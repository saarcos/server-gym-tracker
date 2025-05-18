import Joi from 'joi';
import bcrypt from 'bcrypt'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

//userController.js
const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})
const registerUser = async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        return res.status(401).json({
            success: false, message: error.details[0].message
        })
    }
    try {
        const { username, email, password } = value;
        const userNameExists = await User.findOne({ where: { username } });
        const emailExists = await User.findOne({ where: { email } });
        if (userNameExists) {
            return res.status(401).json({
                success: false, message: 'There\'s already a user with that username registered'
            })
        }
        if (emailExists) {
            return res.status(401).json({
                success: false, message: 'There\'s already a user with that email registered'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: 'Something went wrong, please try again in a couple minutes.'
        })
    }
}
const loginUser = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(401).json({
            success: false, message: error.details[0].message
        })
    }
    try {
        const { email, password } = value;
        const userFound = await User.findOne({ where: { email } });
        if (!userFound) {
            return res.status(401).json({
                success: false, message: 'User not found',
            })
        }
        const passwordValid = await bcrypt.compare(password, userFound.password);
        if (!passwordValid) {
            return res.status(401).json({
                success: false, message: 'Incorrect password',
            })
        }
        const token = jwt.sign(
            {
                id: userFound.id,
                email: userFound.email,
                username: userFound.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
        });
        res.status(201).json({
            success: true, message: 'User logged in!',
            user: { id: userFound.id, username: userFound.username, email: userFound.email }
        })
    } catch (error) {
        res.status(500).json({
            success: false, message: 'Something went wrong, please try again in a couple minutes.'
        })
    }
}
const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
    });
    res.status(200).json({success: true, message: "Logged out" });
}
export { registerUser, loginUser, logoutUser}