import idconv from '../../../utils/idconverter'
import apiHandler from '../../../utils/apihandler'

const handler = apiHandler()


export default handler.get(async (req, res) => {

	let data = await req.db.collection('books').find({}).toArray()

	data = data.map(idconv)

	res.status(200).json(data)

}).post(async (req, res) => {

	const data = req.body

	const book = {
		title: data.title,
		author: data.author,
		description: data.description,
		dateCreated: new Date(Date.now()).toISOString(),
		dateModified: new Date(Date.now()).toISOString()
	}

	const inserted = await req.db.collection('books').insertOne(book)

	res.status(200).json({ ...data, id: inserted.insertedId })
})