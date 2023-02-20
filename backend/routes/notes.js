const express = require("express");
const {addNote, getAllNotes, updateNote, deleteNote,displayNote } = require("../controllers/notes");
const {verifyToken} = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/add', verifyToken ,addNote);
router.get('/getallnotes', verifyToken ,getAllNotes);
router.get('/update/:noteId',verifyToken,displayNote);
router.put('/update/:noteId',verifyToken ,updateNote);
router.delete('/delete/:noteId',verifyToken,deleteNote);

module.exports = router;    