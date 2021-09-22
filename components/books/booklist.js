

const BookListItem = ({ book, selectedId, setSelectedId }) => {
	const selectedBookListItemClass = "bg-gray-300 cursor-pointer p-1"
	const bookListItemClass = "hover:bg-gray-100 cursor-pointer p-1"

	const handleClick = (event) => {
		event.preventDefault()
		if (selectedId === book.id) {
			setSelectedId(null)
		} else {
			setSelectedId(book.id)
		}	
	}
	return (
		<div onClick={handleClick} className={selectedId === book.id ? selectedBookListItemClass : bookListItemClass}>
			<div className="text-lg">{book.title}</div>
			<div className="italic">{book.author}</div>
		</div>
	)
}

const BookList = ({ className, data, selectedId, setSelectedId }) => {


	return (
		<div className={className}>
			<ul className="p-5">
				{data.map((book) =>
					<li key={book.id} className="my-2">
						<BookListItem book={book} selectedId={selectedId} setSelectedId={setSelectedId}></BookListItem>
					</li>
				)}
			</ul>
		</div>
	)
}

export default BookList