import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { useAuthState, useLogout } from '../../../../../hooks/useAuth'

const AuthControl = () => {
	const authState = useAuthState()
	const logout = useLogout()

	return authState.token ? (
		<Button
			variant="outlined"
			className="proview-header-auth_button proview-header-auth_button--outlined"
			onClick={logout}
		>
			Logout
		</Button>
	) : (
		<React.Fragment>
			<Button
				variant="outlined"
				className="proview-header-auth_button proview-header-auth_button--outlined"
			>
				<Link href="/login">
					<a>Log in</a>
				</Link>
			</Button>

			<Button
				variant="contained"
				className="proview-header-auth_button proview-header-auth_button--contained"
			>
				<Link href="/signup">
					<a>Sign Up</a>
				</Link>
			</Button>
		</React.Fragment>
	)
}

export default AuthControl
