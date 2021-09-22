import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

let client = null

async function database(req, res, next) {
	// Global client used for development
	if (process.env.NODE_ENV === 'development') {
		if (!global._mongoClient) {
			global._mongoClient = new MongoClient(process.env.DB_CONNECTION_STRING, options)
			await global._mongoClient.connect()
		}
		client = global._mongoClient
	}

	if (!client) {
		client = new MongoClient(process.env.DB_CONNECTION_STRING, options)
		await client.connect()
	}

	req.dbClient = client
	req.db = client.db('BuuttiTask')

	return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware