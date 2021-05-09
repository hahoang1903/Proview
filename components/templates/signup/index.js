import React from 'react'
import AuthForm from '../../elements/auth-form'

const SignUpTemplate = () => {
	return (
		<AuthForm
			main="Create an account"
			sub="Complete all fields to create your Proview ID."
			formFields={[
				{ name: 'Display name' },
				{ name: 'Email address' },
				{ name: 'Password' }
			]}
			submitText="Create"
			linkText="Have an account? Login"
			linkTo="/login"
		/>
	)
}

export default SignUpTemplate
