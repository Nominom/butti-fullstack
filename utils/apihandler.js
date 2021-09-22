import nextConnect from 'next-connect'
import database from '../middleware/database'

const handler = () => nextConnect({
	onError: (err, req, res, next) => {
		console.error(err.stack)
		res.status(500).end("Something broke!")
	},
	onNoMatch: (req, res, next) => {
		res.status(404).end("API route is not found")
	},
}).use(database)

export default handler