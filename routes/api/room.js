const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> res.send('ROOM URL'));
router.post('/add', [
	check('roomNo').exists().isNumeric(),
	check('floorNo').exists().isNumeric(),
	check('kitchen'),
], (req, res)=>{

});
module.exports = router;
