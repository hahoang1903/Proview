import axios from 'axios'
import React from 'react'
import AuthForm from '../../components/elements/auth-form'

const LoginPage = () => {
	React.useEffect(() => {
		document.title = 'Login'
	}, [])

	return (
		<AuthForm
			sub="Log in with your Proview ID."
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
				},
				{
					name: 'password',
					label: 'Password',
					rules: [
						{
							required: true,
							min: 8,
							message: 'Please provide a password with minimum 8 characters'
						}
					]
				}
			]}
			submitText="Login"
			forgotPassword={true}
			linkText="Create an account"
			linkTo="/signup"
			method={axios.post}
			authRoute="login"
		/>
	)
}

export default LoginPage
