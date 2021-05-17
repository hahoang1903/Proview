import React from 'react'
import axios from 'axios'
import AuthForm from '../../components/elements/auth-form'
import { useAuthState } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const ForgotPasswordPage = () => {
	const { token } = useAuthState()
	const router = useRouter()

	React.useEffect(() => {
		document.title = 'Forgot password'
		if (token) router.replace('/')
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
