import React from 'react'
import AuthForm from '../../elements/auth-form'

const LoginTemplate = () => {
	return (
		<AuthForm
			sub="Log in with your Proview ID."
			formFields={[{ name: 'Email address' }, { name: 'Password' }]}
			submitText="Login"
			forgotPassword={true}
			linkText="Create an account"
			linkTo="/signup"
		/>
	)
}

export default LoginTemplate
