const express = require('express');
const router = express.Router();
const validate = require('../../error/errorValidation');
const UserInfo = require('../../db/model/userInfo');

router.post('/', async(req, res)=>{
	let {name, mobile, email, aadharCard, panId, address = '', state = '', pincode = '', city = ''} = req.body;
	let totalError = [], code, mobileArr = [], emailArr = [];
	let {value, error, errorMessage = ''} = validate({value: email, type: 'email'});
	if (error) totalError.push({value, error, errorMessage});
	if (email && !error) emailArr.push({value});
	({value, error, errorMessage = '', code = ''} = validate({value: mobile, type: 'mobile'}));
	if (error) totalError.push({value, error, errorMessage});
	if (value && !error) mobileArr.push({code, value});
	panId = panId.toUpperCase();
	({value, error, errorMessage = ''} = validate({value: panId, type: 'panId'}));
	if (error) totalError.push({value, error, errorMessage});
	({value, error, errorMessage = ''} = validate({value: aadharCard, type: 'aadharId'}));
	if (error) totalError.push({value, error, errorMessage});
	let firstName = '', fullName = '', middleName, lastName;
	if (name) {
		fullName = name.trim();
		let n = name.trim().split(' ');
		if (n.length === 1) firstName = name.trim();
		if (n.length === 2) {
			firstName = n[0];
			lastName = n[1];
		}
		if (n.length === 3) {
			firstName = n[0];
			middleName = n[1];
			lastName = n[2];
		}
	}
	if (totalError.length) return res.status(400).json({success: false, error: {errorMessage: totalError, data: req.body}});
	const userInfo = new UserInfo({
		'name.first': firstName,
		'name.full': fullName,
		'name.last': lastName,
		'name.middle': middleName,
		mobile: mobileArr,
		email: emailArr,
		panId,
		aadharCard,
		'address.personal': address,
		state,
		city,
		pincode,
	});
	try {
		await userInfo.save();
	}
	catch (err) {console.error(`Error ${err}`);}	// eslint-disable-line no-console
	res.status(200).json({sucess: true, data: req.body});
});
router.get('/', async(req, res)=>{
	const {email} = req.body;
	console.log(req.headers, req.ip, 'HEADEr');

	try {
		const userinfo = await UserInfo.findOne({email: {$elemMatch: {value: email}}});
		res.json({success: true, data: userinfo});
	}
	catch (err) {res.status(400).json({'success': false, error: {errorMessage: err, data: req.body}});}
});
module.exports = router;
