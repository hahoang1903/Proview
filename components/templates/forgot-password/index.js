import React from 'react'
import AuthForm from '../../elements/auth-form'

const ForgotPaswordTemplate = () => {
	return (
		<AuthForm
			main="Forgot password"
			sub="Provide your account's email address and a reset password email will be sent to your inbox."
			formFields={[{ name: 'Email address' }]}
			submitText="Request reset"
			linkText="Have an account? Login"
			linkTo="/login"
		/>
	)
}

export default ForgotPaswordTemplate
