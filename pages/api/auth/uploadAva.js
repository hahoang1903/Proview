import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '../../../util/mongodb'
import { sendTokenResponse } from '../../../util/utils'
import User from '../../../models/user'

cloudinary.config({
	cloud_name: 'hahoangcloud',
	api_key: '117721157213534',
	api_secret: 'avMVdw0psnIOBTRYbdalFkaGxWQ'
})

dbConnect()

export default async function handler(req, res) {
	const { image, id } = req.body

	const avatar = await cloudinary.uploader.upload(image)

	const user = await User.findByIdAndUpdate(
		id,
		{ avatar: avatar.secure_url },
		{
			new: true,
			runValidators: true
		}
	)

	sendTokenResponse(user, 200, res)
}
