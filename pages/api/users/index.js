import { dbConnect } from '../../../util/mongodb'
import User from '../../../models/user'

dbConnect()

export default async function handler(req, res) {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const users = await User.find({})

				return res.status(200).json({ success: true, data: users })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const user = await User.create(req.body)

				return res.status(201).json({ success: true, data: user })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
