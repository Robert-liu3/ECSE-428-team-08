import express from 'express';

const router = express.Router();

let NOTES = [
    {
        id: 'n1',
        notes: 'Helloooo',
        creator: '1',
        section: 'News'
    }
]
//section: General, News, Stocks

//Get all the notes from a specific user
router.get('/user/:uid', (req, res, next) => {
    console.log('GET Request for notes');
    const userId = req.params.uid;

    const notes = NOTES.filter(n => {
        return n.creator === userId;
    });

    //Error handling, returns a message and a 404 error
    if (!notes || notes.length === 0) {
        const error = new Error('Could not find the note for the provided user id.');
        error.code = 404;
        return next(error);
    }

    res.json({notes});
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
router.get('/:nid', (req, res, next) => {
    console.log('GET Request for notes');
    const noteId = req.params.nid;

    const note = NOTES.find(n => {
        return n.id === noteId;
    });

    //Error handling, returns a message and a 404 error
    if (!note) {
        const error = new Error('Could not find the note for the provided id.');
        error.code = 404;
        return next(error);
    }

    res.json({note});
});

//Add a note 
router.post('/', (req, res, next) => {
    const {notes, creator, section} = req.body;

    const createdNote = {
        notes, 
        creator, 
        section
    };

    NOTES.push(createdNote);

    res.status(201).json({note: createdNote});
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