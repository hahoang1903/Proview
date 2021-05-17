import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '../../../util/mongodb'
import Book from '../../../models/book'
import User from '../../../models/user'

cloudinary.config({
	cloud_name: 'hahoangcloud',
	api_key: '117721157213534',
	api_secret: 'avMVdw0psnIOBTRYbdalFkaGxWQ'
})

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
				const { body } = req
				const image = await cloudinary.uploader.upload(body.image)

				const book = await Book.create({ ...body, image: image.secure_url })

				const user = await User.findById(body.creator)

				user.books.push(book)

				return res.status(201).json({ success: true, message: 'Book created' })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
