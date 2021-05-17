import { dbConnect } from '../../../util/mongodb'
import { sendTokenResponse } from '../../../util/utils'
import User from '../../../models/user'

dbConnect()

export default async function handler(req, res) {
	const { currentPassword, newPassword, id } = req.body
	const user = await User.findById(id).select('+password')

	// Check current password
	if (!(await user.matchPassword(currentPassword))) {
		return res
			.status(401)
			.json({ success: false, message: 'Password is incorrect' })
	}

	user.password = newPassword
	await user.save()

	sendTokenResponse(user, 200, res)
}
