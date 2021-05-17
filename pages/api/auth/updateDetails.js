import { dbConnect } from '../../../util/mongodb'
import { sendTokenResponse } from '../../../util/utils'
import User from '../../../models/user'

dbConnect()

export default async function handler(req, res) {
	const { name, email, bio, id } = req.body

	const user = await User.findByIdAndUpdate(
		id,
		{ name, email, bio },
		{
			new: true,
			runValidators: true
		}
	)

	sendTokenResponse(user, 200, res)
}
