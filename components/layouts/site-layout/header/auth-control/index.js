import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button'
import { useAuthState, useLogout } from '../../../../../hooks/useAuth'
import { Avatar } from '@material-ui/core'
import { Dropdown, Menu } from 'antd'

const AuthControl = () => {
	const authState = useAuthState()
	const logout = useLogout()

	const renderMenu = () => (
		<Menu>
			<Menu.Item key="profile">
				<Link href={`/users/${authState.user._id}`}>
					<a>Your profile</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="logout" onClick={logout}>
				<span>Logout</span>
			</Menu.Item>
		</Menu>
	)

	return authState.token ? (
		<Dropdown overlay={renderMenu()} trigger={['click']}>
			<Avatar className="proview-header-auth_avatar" />
		</Dropdown>
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
