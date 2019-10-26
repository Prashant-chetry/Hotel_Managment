const express = require('express');
const router = express.Router();
const Users = require('../../db/model/user');
const gravatar = require('gravatar');
const jwtSignToken = require('../../middleware/jwtToken');
const bcrypt = require('bcrypt');

router.post('/signup', async(req, res)=> {
	const {email, password, passwordTwo: rePassword} = req.body;
	if (rePassword !== password) return res.status(400).json({sucess: false, error: 'password doesnot match'});
	try {
		let user = await Users.findOne({email});
		if (user) return res.status(400).json({sucess: false, error: 'User already exists'});
		const avatorUrl = await gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'retro',
		});
		user = new Users({
			email,
			avatar: avatorUrl,
			password,
		});
		await user.save();
		res.status(200).json({success: true, data: req.body});
	}
	catch (err) {res.status(400).json({'success': false, error: {errorMessage: err, data: req.body}});}
});
router.post('/', async(req, res)=>{
	const {email, password} = req.body;
	try {
		let user = await Users.findOne({email});
		const match = await bcrypt.compare(password, user.password);
		if (!match) return res.status(403).json({success: false, error: {errorMessage: 'Un-Authorized', data: req.body}});
		console.log({_id: user._id, createdAt: user.createdAt}, 'URL'); // eslint-disable-line no-console
		const {success = false, token, errorMessage = ''} = await jwtSignToken({_id: user._id, createdAt: user.createdAt});
		if (!success) return res.status(400).json({success: false, error: {errorMessage, data: req.body}});
		res.status(200).json({success: true, data: token});
	}
	catch (err) {return res.status(500).json({success: false, error: {errorMessage: err, data: req.body}});}
});
module.exports = router;
