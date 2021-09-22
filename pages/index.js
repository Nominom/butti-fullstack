import useSwr from 'swr'
import Link from 'next/link'

import BookList from '../components/books/booklist'
import BookForm from '../components/books/bookform'
import { useEffect, useState } from 'react'


const fetcher = (url) => fetch(url).then((res) => res.json())


export default function Index() {
	const { data, error } = useSwr('/api/books', fetcher)
	const [localData, setLocalData] = useState([])
	const [selectedId, setSelectedId] = useState(null)

	useEffect(() => {
		setLocalData(data)
	}, [data])

	const addedOrUpdated = (id) => {
		if (!!id) {
			fetcher(`/api/books/${id}`).then((book) => {
				console.log('book found:', book)

				let found = false
				let newData = localData.map((b) => {
					if(b.id === book.id) {
						found = true
						return book
					}else{
						return b
					}
				})

				if(!found) {
					newData.push(book)
				}

				setLocalData(newData)
			})
		}
	}

	const removeFromList = (id) => {
		const newData = localData.filter((book) => book.id !== id)
		setLocalData(newData)
	}

	if (error) return <div>Failed to load books</div>
	if (!data) return <div>Loading...</div>

	return (
		<div className="">
			<h1 className="text-5xl text-center mx-auto my-8">Books</h1>
			<div className="flex flex-col lg:flex-row">
				<BookForm className="flex-1" selectedId={selectedId} setSelectedId={setSelectedId} 
				removeFromList={removeFromList} addedOrUpdated={addedOrUpdated} />
				<div className="flex-1">
					{localData && <BookList data={localData} className="" selectedId={selectedId} setSelectedId={setSelectedId} />}
				</div>
			</div>
		</div>
	)
}
