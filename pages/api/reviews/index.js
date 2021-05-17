import { dbConnect } from '../../../util/mongodb'
import Review from '../../../models/review'

dbConnect()

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const { query } = req
			try {
				const reviews = await Review.find({})

				return res.status(200).json({ success: true, data: reviews })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const review = await Review.create(req.body)

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
