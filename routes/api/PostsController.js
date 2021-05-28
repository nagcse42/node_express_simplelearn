const express = require('express');
const router = express.Router();

//fetch all posts
router.get('/', (req, resp) => {
    resp.json([{name:'FB Post', about:'Meetings'}, {name:'Linkedin Post', about:'Tech stack'}]);
})

module.exports = router;