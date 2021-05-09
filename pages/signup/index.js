import React from 'react'
import SignUpTemplate from '../../components/templates/signup'

const SignUpPage = () => {
	React.useEffect(() => {
		document.title = 'Sign up'
	}, [])

	return (
		<React.Fragment>
			<SignUpTemplate />
		</React.Fragment>
	)
}

export default SignUpPage
