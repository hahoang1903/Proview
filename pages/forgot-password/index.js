import React from 'react'
import axios from 'axios'
import AuthForm from '../../components/elements/auth-form'

const ForgotPasswordPage = () => {
	React.useEffect(() => {
		document.title = 'Forgot password'
	}, [])

	return (
		<AuthForm
			main="Forgot password"
			sub="Provide your account's email address and a reset password email will be sent to your inbox."
			formFields={[
				{
					name: 'email',
					label: 'Email address',
					rules: [
						{
							required: true,
							type: 'email',
							message: 'Please provide a valid email. Ex: example@gmail.com'
						}
					]
				}
			]}
			submitText="Request reset"
			linkText="Have an account? Login"
			linkTo="/login"
			method={axios.post}
			action="forgot-password"
		/>
	)
}

export default ForgotPasswordPage
