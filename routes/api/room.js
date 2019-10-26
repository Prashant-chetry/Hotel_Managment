const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> res.send('ROOM URL'));
router.post('/add', (req, res)=>{

});
module.exports = router;
