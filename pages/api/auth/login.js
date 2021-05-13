import { dbConnect } from '../../../util/mongodb'
import { sendTokenResponse } from '../../../util/utils'
import User from '../../../models/user'

dbConnect()

export default async function login(req, res) {
	const { email, password } = req.body

	// Validate email & password
	if (!email || !password) {
		return res
			.status(400)
			.json({ success: false, message: 'Please provide an email and password' })
	}

	// Check for user
	const user = await User.findOne({ email }).select('+password')

	if (!user) {
		return res
			.status(401)
			.json({ success: false, message: 'There is no user with that email' })
	}

	// Check if password matches
	const isMatch = await user.matchPassword(password)

	if (!isMatch) {
		return res.status(401).json({ success: false, message: 'Wrong password' })
	}

	sendTokenResponse(user, 200, res)
}
