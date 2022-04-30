// CRUD create read update delete

const mongodb = require('mongodb');

const { ObjectId, MongoClient } = mongodb;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId('6257d083a49fe5b007915ffd');

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database.');
	}
	const db = client.db(databaseName);
});
