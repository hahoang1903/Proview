import { dbConnect } from '../../../util/mongodb'
import Review from '../../../models/review'
import Book from '../../../models/book'
import Movie from '../../../models/movie'
import User from '../../../models/user'

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
				const review = await Review.findById(id)

				if (!review)
					return res
						.status(404)
						.json({ success: false, message: 'Review not found' })

				return res.status(200).json({ success: true, data: review })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'PATCH':
			try {
				const oldReview = await Review.findById(id)

				const review = await Review.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true
				})

				if (!review || !oldReview)
					return res
						.status(404)
						.json({ success: false, message: 'Review not found' })

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
					(resource.rating * resource.reviews.length -
						oldReview.rating +
						review.rating) /
					resource.reviews.length
				resource.save()

				return res.status(200).json({ success: true, data: review })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'DELETE':
			try {
				const deletedReview = await Review.deleteOne({ _id: id })

				if (!deletedReview)
					return res
						.status(404)
						.json({ success: false, message: 'Review not found' })

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
					resource.reviews.length - 1 == 0
						? 0
						: (resource.rating * resource.reviews.length -
								Number(body.rating)) /
						  (resource.reviews.length - 1)
				resource.reviews.splice(resource.reviews.indexOf(id), 1)
				resource.save()

				const user = await User.findById(body.author)
				user.reviews.splice(user.reviews.indexOf(id), 1)
				user.save()

				return res
					.status(200)
					.json({ success: true, message: 'Review deleted' })
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
