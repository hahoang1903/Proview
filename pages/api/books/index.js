import { dbConnect } from '../../../util/mongodb'
import Book from '../../../models/book'

dbConnect()

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const books = await Book.find({})

				return res.status(200).json({ success: true, data: books })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const book = await Book.create(req.body)

				return res.status(201).json({ success: true, data: book })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
