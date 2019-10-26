// const jwt = require('jsonwebtoken');
// const config = require('config');
// const secrect = config.get('jwtTokenSecret');

// module.export = async(req, res, next)=>{
// 	const token = req.header('x-auth-token');
// 	if (!token) return res.json({success: false, errorMessage: 'empty'});
// 	try {
// 		const decode = await jwt.verify(token, secrect);
// 		req.token = decode;
// 		next();
// 	}
// 	catch (err) {return res.json({success: false, errorMessage: err});}
// };
