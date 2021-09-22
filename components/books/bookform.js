import { useState, useEffect } from 'react'

const inputClassName = "border border-gray-400 rounded-sm my-2"
const buttonClassName = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow mr-4"
const buttonClassNameDisabled = "bg-white text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow mr-4 opacity-50 cursor-not-allowed"


const jsonFetch = (url, method, data) => fetch(url, {
	method: method,
	mode: 'same-origin',
	cache: 'no-cache',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
}).then((res) => res.json())

const fetcher = (url) => fetch(url).then((res) => res.json())

const initialState = {
	title: '',
	author: '',
	description: ''
}

const BookForm = ({ className, selectedId, setSelectedId, addedOrUpdated, removeFromList }) => {
	const [state, setState] = useState(initialState)

	const editing = !!selectedId

	console.log('editing:',editing)

	useEffect(() => {
		if(editing) {
			fetcher(`/api/books/${selectedId}`).then((book) => {
				console.log('book returned:', book)
				setState({
					title: book.title,
					author: book.author,
					description: book.description
				})
			})
		}else{
			setState(initialState)
		}
	}, [selectedId])

	const handleSaveNew = (event) => {
		event.preventDefault()

		jsonFetch('/api/books', 'POST', state).then((book) => {
			if(book.id){
				setSelectedId(book.id)
				addedOrUpdated(book.id)
			}
		})
	}

	const handleSave = (event) => {
		event.preventDefault()

		jsonFetch(`/api/books/${selectedId}`, 'PUT', state).then((book) => {
			setSelectedId(book.id)
			addedOrUpdated(book.id)
		})
	}

	const handleDelete = (event) => {
		event.preventDefault()

		jsonFetch(`/api/books/${selectedId}`, 'DELETE', null).then((data) => {
			removeFromList(selectedId)
			setSelectedId(null)
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		if(editing)
		{
			handleSave(event)
		}else{
			handleSaveNew(event)
		}
	}

	const handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name

		setState({
			...state,
			[name]: value
		})
	}

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className='flex flex-col w-full'>
				<div className='flex flex-col flex-grow p-5'>

					<label>Title</label>
					<input className={inputClassName}
						name={'title'}
						type={'text'}
						value={state.title}
						onChange={handleInputChange}>
					</input>

					<label>Author</label>
					<input className={inputClassName}
						name={'author'}
						type={'text'}
						value={state.author}
						onChange={handleInputChange}>
					</input>

					<label>Description</label>
					<textarea className={inputClassName}
						name={'description'}
						value={state.description}
						onChange={handleInputChange}>
					</textarea>
				</div>

				<div className='flex flex-row px-5 py-2'>
					<button className={buttonClassName} onClick={handleSaveNew}>Save New</button>
					<button className={editing ? buttonClassName : buttonClassNameDisabled} onClick={handleSave} disabled={!editing}>Save</button>
					<button className={editing ? buttonClassName : buttonClassNameDisabled} onClick={handleDelete} disabled={!editing}>Delete</button>
				</div>
			</form>
		</div>

	)
}

export default BookForm