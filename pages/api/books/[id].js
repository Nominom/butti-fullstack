import { ObjectId } from 'bson'
import idconv from '../../../utils/idconverter'
import apiHandler from '../../../utils/apihandler'

const handler = apiHandler()

handler
	.get(async (req, res) => {
		const id = req.query.id

		let book = await req.db.collection('books').findOne({ "_id": ObjectId(id) })
		if (book !== null) {
			book = idconv(book)
			res.status(200).json(book)
		} else {
			res.status(404)
		}
	})
	.put(async (req, res) => {
		const id = req.query.id

		const data = req.body

		const update = {
			$set: {
				title: data.title,
				author: data.author,
				description: data.description,
				dateModified: new Date(Date.now()).toISOString()
			}
		}

		const options = {
			upsert: true,
			returnOriginal: false
		}

		const result = await req.db.collection('books').findOneAndUpdate(
			{ "_id": ObjectId(id) }, update, options
		)

		console.log(result)

		res.status(200).json(idconv(result.value))
	})
	.delete(async (req, res) => {
		const id = req.query.id

		const result = await req.db.collection('books').deleteOne({ "_id": ObjectId(id) })

		console.log(result)

		if (result.deletedCount === 1) {
			res.status(200).json({ success: true })
		} else {
			res.status(204).json({ success: false })
		}
	})

export default handler