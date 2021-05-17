import { dbConnect } from '../../../util/mongodb'
import User from '../../../models/user'
import { sendTokenResponse } from '../../../util/utils'

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
				const user = await User.findById(id)

				if (!user)
					return res
						.status(404)
						.json({ success: false, message: 'User not found' })

				return sendTokenResponse(user, 200, res)
			} catch (error) {
				console.log(error)

				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'PUT':
			try {
				const user = await User.findByIdAndUpdate(id, body, {
					new: true,
					runValidators: true
				})

				if (!user)
					return res
						.status(404)
						.json({ success: false, message: 'User not found' })

				return sendTokenResponse(user, 200, res)
			} catch (error) {
				return res
					.status(400)
					.json({ success: false, message: 'Something went wrong' })
			}
		case 'DELETE':
			try {
				const deletedUser = await User.deleteOne({ _id: id })

				if (!deletedUser)
					return res
						.status(404)
						.json({ success: false, message: 'User not found' })

				return sendTokenResponse(user, 200, res)
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
