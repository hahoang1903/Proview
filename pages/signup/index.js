import axios from 'axios'
import React from 'react'
import AuthForm from '../../components/elements/auth-form'
import { useAuthenticate } from '../../hooks/useUser'

const SignUpPage = () => {
	React.useEffect(() => {
		document.title = 'Sign up'
	}, [])

	return (
		<AuthForm
			main="Create an account"
			sub="Complete all fields to create your Proview ID."
			formFields={[
				{
					name: 'name',
					label: 'Display name',
					rules: [
						{
							required: true,
							message: 'Please provide a display name'
						}
					]
				},
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
			fetchMethod={axios.post}
			authRoute="signup"
			submitText="Create"
			linkText="Have an account? Login"
			linkTo="/login"
			useAuthDispatch={useAuthenticate}
		/>
	)
}

export default SignUpPage
