import React from 'react'
import LoginTemplate from '../../components/templates/login'

const LoginPage = () => {
	React.useEffect(() => {
		document.title = 'Login'
	}, [])

	return (
		<React.Fragment>
			<LoginTemplate />
		</React.Fragment>
	)
}

export default LoginPage
