import { dbConnect } from '../../../util/mongodb'
import Book from '../../../models/book'

dbConnect()

export default async function handler(req, res) {
	const {
		method,
		query: { id },
		body
	} = req

	switch (method) {
		case 'GET':
			try {
				const book = await Book.findById(id)

				if (!book)
					return res
						.status(404)
						.json({ success: false, message: 'Book not found' })

				return res.status(200).json({ success: true, data: book })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'PATCH':
			try {
				const book = await Book.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true
				})

				if (!book)
					return res
						.status(404)
						.json({ success: false, message: 'Book not found' })

				return res.status(200).json({ success: true, data: book })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'DELETE':
			try {
				const deletedBook = await Book.deleteOne({ _id: id })

				if (!deletedBook)
					return res
						.status(404)
						.json({ success: false, message: 'Book not found' })

				return res.status(200).json({ success: true, message: 'Book deleted' })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
