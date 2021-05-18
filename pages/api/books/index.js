import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '../../../util/mongodb'
import Book from '../../../models/book'
import User from '../../../models/user'
import { addQueryPropIfExist } from '../../../util/utils'

cloudinary.config({
	cloud_name: 'hahoangcloud',
	api_key: '117721157213534',
	api_secret: 'avMVdw0psnIOBTRYbdalFkaGxWQ'
})

dbConnect()

export default async function handler(req, res) {
	const { method, query } = req

	switch (method) {
		case 'GET':
			const {
				name,
				authors,
				genres,
				yearFrom,
				yearTo,
				ratingFrom,
				ratingTo,
				sortBy
			} = query

			let queryObj = {}

			if (name) {
				queryObj.name = new RegExp(name, 'i')
			}

			if (authors) {
				const authorsArr = authors.split(/[ ,]+/)
				queryObj.authors = { $in: authorsArr }
			}

			if (genres) {
				const genresArr = genres.split(/[ ,]+/)
				queryObj.genres = { $in: genresArr }
			}

			if (yearFrom) {
				queryObj.releasedYear = {
					...queryObj.releasedYear,
					$gte: Number(yearFrom)
				}
			}

			if (yearTo) {
				queryObj.releasedYear = {
					...queryObj.releasedYear,
					$lte: Number(yearTo)
				}
			}

			if (ratingFrom) {
				queryObj.rating = {
					...queryObj.rating,
					$gte: Number(ratingFrom)
				}
			}

			if (ratingTo) {
				queryObj.rating = {
					...queryObj.rating,
					$lte: Number(ratingTo)
				}
			}

			try {
				let books
				switch (sortBy) {
					case 'rating':
						books = await Book.find(queryObj).sort({ rating: 1 })
						break
					case 'releasedYear':
						books = await Book.find(queryObj).sort({ releasedYear: 1 })
						break
					default:
						books = await Book.find(queryObj).sort({ name: 1 })
						break
				}

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
