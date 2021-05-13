import { dbConnect } from '../../../util/mongodb'
import User from '../../../models/user'

dbConnect()

export default async function (req, res, next) {
	const user = await User.findOne({ email: req.body.email })

	if (!user) {
		return res
			.status(401)
			.json({ success: false, message: 'There is no user with that email' })
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken()

	await user.save({ validateBeforeSave: false })

	// Create reset url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/auth/resetpassword/${resetToken}`

	const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please go to if you want to reset your password: \n\n ${resetUrl}`

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message
		})

		res.status(200).json({ success: true, data: 'Email sent' })
	} catch (err) {
		console.log(err)
		user.resetPasswordToken = undefined
		user.resetPasswordExpire = undefined

		await user.save({ validateBeforeSave: false })

		return next(new ErrorResponse('Email could not be sent', 500))
	}
}
