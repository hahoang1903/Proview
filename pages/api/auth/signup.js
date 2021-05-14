import { dbConnect } from '../../../util/mongodb'
import { sendTokenResponse } from '../../../util/utils'
import User from '../../../models/user'

dbConnect()

export default async function signUp(req, res) {
	const { method } = req
	switch (method) {
		case 'POST':
			try {
				const { name, email, password } = req.body

				const user = await User.create({
					name,
					email,
					password
				})

				user.save({ validateBeforeSave: false })

				return sendTokenResponse(user, 201, res)
			} catch (error) {
				return res.status(400).json({
					success: false,
					message: 'The email you provided is already exists'
				})
			}
		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
