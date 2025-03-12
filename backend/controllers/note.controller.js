import Note from '../models/note.model.js';

export const addNote = async (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) return res.status(400).json({ error: true, message: 'Title and content required' });
    const note = new Note({ title, content, tags: tags || [], userId: req.user.user._id });
    await note.save();
    res.json({ error: false, note, message: 'Note added successfully' });
};

export const editNote = async (req, res) => {
    const { title, content, tags, isPinned } = req.body;
    const note = await Note.findOne({ _id: req.params.noteId, userId: req.user.user._id });
    if (!note) return res.status(404).json({ error: true, message: 'Note not found' });
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;
    await note.save();
    res.json({ error: false, note, message: 'Note updated successfully' });
};

export const getAllNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.user.user._id }).sort({ isPinned: -1 });
    res.json({ error: false, notes, message: 'All notes retrieved successfully' });
};

export const deleteNote = async (req, res) => {
    const note = await Note.findOneAndDelete({ _id: req.params.noteId, userId: req.user.user._id });
    if (!note) return res.status(404).json({ error: true, message: 'Note not found' });
    res.json({ error: false, message: 'Note deleted successfully' });
};

export const updateNotePinned = async (req, res) => {
    const note = await Note.findOne({ _id: req.params.noteId, userId: req.user.user._id });
    if (!note) return res.status(404).json({ error: true, message: 'Note not found' });
    note.isPinned = req.body.isPinned;
    await note.save();
    res.json({ error: false, note, message: 'Note updated successfully' });
};

export const searchNotes = async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res
            .status(400)
            .json({ error:true, message: 'Search query is required' });
    }

    try{
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, 'i') } },
                { content: { $regex: new RegExp(query, 'i') } },
            ],
        });
        return res.json({
            error: false,
            notes: matchingNotes,
            message: 'Notes matching the search query retrieved successfully',
        });
    }catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error',
        });
    }
};