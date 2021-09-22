
const convert = (object) => {
	const id = object._id.toString()
	delete object._id
	return { id, ...object }
}

export default convert