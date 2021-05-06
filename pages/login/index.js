import React from 'react'
import LoginTemplate from '../../components/templates/login'

const LoginPage = props => {
	useEffect(() => {
		document.title = 'Login'
	}, [])

	return (
		<React.Fragment>
			<LoginTemplate />
		</React.Fragment>
	)
}

export default LoginPage
