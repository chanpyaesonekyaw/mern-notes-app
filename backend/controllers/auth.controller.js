import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const createAccount = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) return res.status(400).json({ error: true, message: 'All fields are required' });
    if (await User.findOne({ email })) return res.json({ error: true, message: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
    res.json({ error: false, user, accessToken, message: 'Registration Successful' });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });
    if (!userInfo || !(await bcrypt.compare(password, userInfo.password))) {
        return res.json({ error: true, message: 'Invalid Credentials' });
    }
    const accessToken = jwt.sign({ user: userInfo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10h' });
    res.json({ error: false, message: 'Login Successful', email, accessToken });
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.user.user._id);
    if (!user) return res.sendStatus(401);
    res.json({ user, message: '' });
};