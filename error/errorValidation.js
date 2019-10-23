/* eslint-disable no-lone-blocks */
const validator = require('validator');

const validate = ({value, type} = {})=>{
	if (!value && !type) return {error: true, value, errorMessage: 'empty'};
	value = value.replace(/\s+/g, '');
	switch (type) {
		case 'mobile' || 'phone': {
			if (value.length !== 10) {
				if (value.indexOf('+') === 0 && !value.split('+91')[0].length) {
					if (validator.isMobilePhone(value, 'en-IN')) return {code: '+91', error: false, value: value.split('+91')[1]};
					return {error: true, value, errorMessage: 'notIndian'};
				}
				else if (value.indexOf('0') === 0) {
					if (validator.isMobilePhone(value, 'en-IN')) return {code: '0', error: false, value: value.slice(1)};
					return {error: true, value, errorMessage: 'notIndian'};
				}
				return {error: true, value, errorMessage: 'notMobileNo'};
			}
			if (validator.isMobilePhone(value, 'en-IN')) return {code: '', error: false,  value};
			return {error: true, errorMessage: 'notIndian', value};
		}
			break;
			// case 'pincode': {
			// }
			// 	break;
		case 'aadharId': {
			if (value.length !== 12) return {error: true, value, errorMessage: 'notAadharId'};

			if (new RegExp(/\d{12}/).test(value)) return {error: false, value};
			return {error: true, value, errorMessage: 'notAadharId'};
		}
		case 'panId': {
			if (value.length !== 10) return {error: true, value, errorMessage: 'notPanId'};
			if (new RegExp(/^([A-Z]{5})([0-9]{4})([A-Z]{1})$/).test(value)) return {error: false, value};
			return {error: true, value, errorMessage: 'notPanId'};
		}
		case 'email': {
			if (validator.isEmail(value)) return {error: false, value};
			return {error: true, errorMessage: 'NotEmail', value};
		}
		case 'jwt': {
			if (validator.isJWT(value)) return {error: false, value};
			return {error: true, errorMessage: 'NotJwt', value};
		}
		default:
			break;
	}
};
module.exports = validate;
