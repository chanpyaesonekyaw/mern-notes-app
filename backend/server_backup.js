import express from 'express';
import cors from "cors";
import { connectDB } from './config/db.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticateToken } from './utilities.js';
import User from './models/user.model.js';
import Note from './models/note.model.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); 

app.use(
    cors({
        origin: "*",
    })
);


// Create Account
app.post('/create-account', async (req, res) => {
    const { fullName, email, password } = req.body;

    if(!fullName) {
        return res.status(400).json({ error: true, message: 'Full Name is required' });
    }

    if(!email){
        return res.status(400).json({ error:true, message: 'Email is required' });
    }

    if(!password){
        return res.status(400).json({ error:true, message: 'Password is required' });
    }

    const isUser = await User.findOne({ email: email });

    if(isUser){
        return res.json({ error:true, message: 'User already exist' })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User ({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
       expiresIn: '36000m', 
    });

    return res.json({
        error:false,
        user,
        accessToken,
        message: 'Registeration Successful',
    });
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }

    if(!password){
        return res.status(400).json({ message: 'Password is required' })
    }

    const userInfo = await User.findOne({ email:email });

    if (!userInfo){
        return res.status(400).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (email == userInfo.email && passwordMatch) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m',
        });
        return res.json({
            error: false,
            message: 'Login Successful',
            email,
            accessToken,
        });
    } else {
        return res.json({
            error: true,
            message: 'Invalid Credentials',
        });
    }
});

// Get User
app.get('/get-user', authenticateToken, async (req, res) => {
    const { user } = req.user;
    console.log(user);
    const isUser = await User.findOne({ _id: user._id });

    if(!isUser){
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: '',
    });
});

// Add Note
app.post('/add-note', authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if(!title){
        return res.status(400).json({ error:true, message: 'Title is required' });
    }

    if(!content){
        return res.status(400).json({ error:true, message: 'Content is required' });
    }

    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();

        return res.json({
            error:false,
            note,
            message: 'Note added successfully',
        });
    } catch(error){
        return res.status(500).json({ error:true, message: 'Intetnal Server Error' });
    }
});

// Edit Note
app.put('/edit-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if(!title && !content && !tags){
        return res.status(400).json({ error:true, message: 'No Chnages provided' });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note){
            return res.status(404).json({ error:true, message: 'Note not found' });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note updated successful',
        });
    } catch (error) {
        return res.status(500).json({ error:true, message: 'Intetnal Server Error' });
    }
});

// Get All Notes
app.get('/get-all-notes', authenticateToken, async (req, res) => {
    
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id })
        .sort({ isPinned: -1 });

        if(!notes){
            return res.status(404).json({ error:true, message: 'Note not found' });
        }

        return res.json({
            error: false,
            notes,
            message: 'All notes retrieved successfully',
        });
    } catch (error) {
        return res.status(500).json({ error:true, message: 'Intetnal Server Error' });
    }
});

// Delete Note
app.delete('/delete-note/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id  })
        .sort({ isPinned: -1 });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: 'Note deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({ error:true, message: 'Intetnal Server Error' });
    }
});

// Update isPinned Note
app.put('/update-note-pinned/:noteId', authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: 'Note not found' });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note updated successful',
        });
    } catch (error) {
        return res.status(500).json({ error:true, message: 'Intetnal Server Error' });
    }
});

app.listen(PORT, () => {
    connectDB();  
    console.log('Server is running on http://localhost:' + PORT);
});

