const express = require('express');
const router = express.Router();
const Users = require('../../db/model/user');
const gravatar = require('gravatar');

router.post('/', async(req, res)=> {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({error: errors.array()});
	}
	const {email, password} = req.body;
	try {
		let user = await Users.findOne({email});
		if (user) return res.status(400).json({sucess: false, error: 'User already exists'});
		const avatorUrl = await gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'retro',
		});
		console.log(avatorUrl, 'URL'); // eslint-disable-line no-console
		user = new Users({
			email,
			avatar: avatorUrl,
			password,
		});
		await user.save();
		res.status(200).json({sucess: true, data: user});
	}
	catch (err) {res.status(400).json({'success': false, error: {errorMessage: err, data: req.body}});}
});
module.exports = router;
