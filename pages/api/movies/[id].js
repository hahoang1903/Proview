import { dbConnect } from '../../../util/mongodb'
import Movie from '../../../models/movie'

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
				const movie = await Movie.findById(id)

				if (!movie)
					return res
						.status(404)
						.json({ success: false, message: 'Movie not found' })

				return res.status(200).json({ success: true, data: movie })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'PATCH':
			try {
				const movie = await Movie.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true
				})

				if (!movie)
					return res
						.status(404)
						.json({ success: false, message: 'Movie not found' })

				return res.status(200).json({ success: true, data: movie })
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'DELETE':
			try {
				const deletedMovie = await Movie.deleteOne({ _id: id })

				if (!deletedMovie)
					return res
						.status(404)
						.json({ success: false, message: 'Movie not found' })

				return res.status(200).json({ success: true, message: 'Movie deleted' })
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
