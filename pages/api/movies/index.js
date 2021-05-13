import { dbConnect } from '../../../util/mongodb'
import Movie from '../../../models/movie'

dbConnect()

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const movies = await Movie.find({})

				return res.status(200).json({ success: true, data: movies })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const movie = await Movie.create(req.body)

				return res.status(201).json({ success: true, data: movie })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
