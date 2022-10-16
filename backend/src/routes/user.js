import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();

router.get('/profile', (req, res) => {
    res.send('THIS WORKS');
    
    // Redirect the user to the profile page
});

export default router;