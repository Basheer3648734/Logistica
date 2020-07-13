const { connect , connection } = require('mongoose');
const { config } = require('dotenv');


module.exports = () => {
	//MongoDB Connection String : NodeJS 2.2+
config(); //dotenv config
const uri = `mongodb://cluster0-shard-00-00.16u1k.mongodb.net:27017,cluster0-shard-00-01.16u1k.mongodb.net:27017,cluster0-shard-00-02.16u1k.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-xlci0y-shard-0&authSource=admin&retryWrites=true&w=majority`

//MongoDB : Connection 

connect(uri, {
	dbName:process.env.DB_NAME,
	user:process.env.DB_USER,
	pass:process.env.DB_PASS,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	})
.then(() => {
	console.log('Connection estabislished with MongoDB');	
})
.catch(error => console.error(error.message));

connection.on('connected', () => {
	console.log('Mongoose connected to DB Cluster');
})

connection.on('error', (error) => {
	console.error(error.message);
})

connection.on('disconnected', () => {
	console.log('Mongoose Disconnected');
})

process.on('SIGINT',() => {
	connection.close(() => {
		console.log('Mongoose connection closed on Application Timeout');
			process.exit(0);
	})
});
}