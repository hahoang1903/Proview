import axios from 'axios'
import React from 'react'
import AuthForm from '../../components/elements/auth-form'
import { useAuthenticate, useAuthState } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const LoginPage = () => {
	const { token } = useAuthState()
	const router = useRouter()
	React.useEffect(() => {
		document.title = 'Login'
		if (token) router.replace('/')
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
			linkText="Create an account"
			linkTo="/signup"
			fetchMethod={axios.post}
			authRoute="login"
			useAuthDispatch={useAuthenticate}
		/>
	)
}

export default LoginPage
