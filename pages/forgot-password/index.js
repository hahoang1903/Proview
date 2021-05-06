import React from 'react'
import ForgotPasswordTemplate from '../../components/templates/forgot-password'

const ForgotPasswordPage = props => {
	useEffect(() => {
		document.title = 'Forgot Password'
	}, [])

	return (
		<React.Fragment>
			<ForgotPasswordTemplate />
		</React.Fragment>
	)
}

export default ForgotPasswordPage
