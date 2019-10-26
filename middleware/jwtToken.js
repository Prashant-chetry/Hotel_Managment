const jwt = require('jsonwebtoken');
const config = require('config');
const secrect = config.get('jwtTokenSecret');
module.exports = async(obj = {})=>{
	try {
		if (!Object.keys(obj).length) return {success: false, errorMessage: 'empty'};
		const token = await jwt.sign(obj, secrect);
		return {success: true, token};
	}
	catch (err) {return {success: false, errorMessage: err};}
};
