const mongoose = require('mongoose');
const config = require('config');
const url = config.get('mongoUrl');

const connectMongoDb = async()=>{
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDb connected ..........');	// eslint-disable-line no-console
	}
	catch (err) {console.error(`Error Mongodb : ${JSON.stringify(err)}`);} // eslint-disable-line no-console
};
module.exports = connectMongoDb;
