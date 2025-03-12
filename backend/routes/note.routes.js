import express from 'express';
import { addNote, editNote, getAllNotes, deleteNote, updateNotePinned, searchNotes } from '../controllers/note.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add-note', authenticateToken, addNote);
router.put('/edit-note/:noteId', authenticateToken, editNote);
router.get('/get-all-notes', authenticateToken, getAllNotes);
router.delete('/delete-note/:noteId', authenticateToken, deleteNote);
router.put('/update-note-pinned/:noteId', authenticateToken, updateNotePinned);
router.get('/search-notes/', authenticateToken, searchNotes);

export default router;