export const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken()

	res.status(statusCode).json({
		success: true,
		token
	})
}
