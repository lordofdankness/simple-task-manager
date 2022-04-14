// CRUD create read update delete

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

mongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database.');
	}
	const db = client.db(databaseName);

	db.collection('users').insertOne({
		name: 'Karlo',
		age: 30,
	});
});
