import express from 'express';

import Notes from '../models/notes.js';
const router = express.Router();
let NOTES = [
    {
        id: 'n1',
        title: "First Note",
        notes: 'Helloooo',
        creator: '1',
        section: 'News'
    },
    {
        id: 'n2',
        title: "Second Note",
        notes: 'Hii',
        creator: '1',
        section: 'News'
    }
]
//section: General, News, Stocks

//Get all the notes from a specific user
router.get('/user/:uid', async (req, res, next) => {
    console.log('GET Request for notes');
    const userId = req.params.uid;

    // const notes = NOTES.filter(n => {
    //     return n.creator === userId;
    // });
    let notes;

    notes = await Notes.find({ creator: userId });
    

    //Error handling, returns a message and a 404 error
    if (!notes || notes.length === 0) {
        const error = new Error('Could not find the note for the provided user id.');
        error.code = 404;
        return next(error);
    }

    res.json({notes: notes.map( note => note.toObject({ getters: true }))});
});

//Get all the notes from a specific section 
router.get('/section/:sid', (req, res, next) => {
    console.log('GET Request for notes');
    const sectionId = req.params.sid;

    const note = NOTES.find(n => {
        return n.section === sectionId;
    });

    //Error handling, returns a message and a 404 error
    if (!note) {
        const error = new Error('Could not find the note for the provided section id.');
        error.code = 404;
        return next(error);
    }

    res.json({note});
});

//Get a specific note
router.get('/:nid', async (req, res, next) => {
    console.log('GET Request for notes');
    const noteId = req.params.nid;

    // const note = NOTES.find(n => {
    //     return n.id === noteId;
    // });
    const note = await Notes.findById(noteId);

    //Error handling, returns a message and a 404 error
    if (!note) {
        const error = new Error('Could not find the note for the provided id.');
        error.code = 404;
        return next(error);
    }

    //res.json({note});
    res.json({note:note.toObject( {getters: true }) });
});

//Add a note 
router.post('/', async (req, res, next) => {
    const {title, notes, creator, section} = req.body;

    // const createdNote = {
    //     id:"n3",
    //     title,
    //     notes, 
    //     creator, 
    //     section
    // };
    // NOTES.push(createdNote);
    const createdNote = new Notes({
        title: title,
        notes: notes, 
        creator: creator, 
        section: section
    });

    await createdNote.save();

    //res.status(201).json({note: createdNote});
});

//Update a note
router.patch('/:nid', (req, res, next) => {
    const {notes} = req.body;
    const noteId = req.params.nid;

    const updatedNote = { ...NOTES.find(n => n.id === noteId)};
    const noteIndex = NOTES.findIndex(n => n.id === noteId);
    updatedNote.notes = notes;

    NOTES[noteIndex] = updatedNote;

    res.status(200).json({note: updatedNote});
});

//Delete a note
router.delete('/:nid', (req, res, next) => {
    const noteId = req.params.pid;
    NOTES= NOTES.filter(n => n => n.id !== noteId);
    res.status(200).json({message: 'Deleted note'});
});

export default router;