import { dbConnect } from '../../../util/mongodb'
import Review from '../../../models/review'
import Book from '../../../models/book'
import Movie from '../../../models/movie'
import User from '../../../models/user'

dbConnect()

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
		case 'GET':
			const {
				query: { author, reviewOn, limit }
			} = req

			try {
				var reviews
				if (author) {
					reviews = await Review.find({ author })
				} else if (reviewOn) {
					reviews = await Review.find({ reviewOn })
				} else {
					reviews = await Review.find({})
				}

				return res.status(200).json({ success: true, data: reviews })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const review = await Review.create(body)

				let resource
				switch (body.onModel) {
					case 'Book':
						resource = await Book.findById(body.reviewOn)
						break
					case 'Movie':
						resource = await Movie.findById(body.reviewOn)
						break
					default:
						throw new Error('Bad onModel value')
				}

				resource.rating =
					(resource.rating * resource.reviews.length + review.rating) /
					(resource.reviews.length + 1)
				resource.reviews.push(review)
				resource.save()

				const user = await User.findById(body.author)
				user.reviews.push(review)
				user.save()

				return res.status(201).json({ success: true, data: review })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
