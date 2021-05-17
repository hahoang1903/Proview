import { dbConnect } from '../../../util/mongodb'
import Review from '../../../models/review'

dbConnect()

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			const {
				query: { author, reviewOn, limit }
			} = req

			try {
				var reviews
				if (author) {
					reviews = await Review.find({ author })
						.limit(Number(limit))
						.sort({ score: 1 })
				} else if (reviewOn) {
					reviews = await Review.find({ reviewOn }).sort({ score: 1 })
				} else {
					reviews = await Review.find({}).sort({ score: 1 })
				}

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
