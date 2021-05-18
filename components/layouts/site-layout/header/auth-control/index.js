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
					<a>My profile</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="my-posts">
				<Link href={`/users/${authState.user._id}/my-posts`}>
					<a>My posts</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="logout" onClick={logout}>
				<span>Logout</span>
			</Menu.Item>
		</Menu>
	)

	return authState.token ? (
		<Dropdown
			overlay={renderMenu()}
			trigger={['click']}
			placement="bottomRight"
		>
			<Avatar
				className="proview-header-right-item proview-header-right_avatar"
				src={authState.user.avatar}
			/>
		</Dropdown>
	) : (
		<React.Fragment>
			<Button
				variant="outlined"
				className="proview-header-right-item proview-header-right_button proview-header-right_button--outlined"
			>
				<Link href="/login">
					<a>Log in</a>
				</Link>
			</Button>

			<Button
				variant="contained"
				className="proview-header-right-item proview-header-right_button proview-header-right_button--contained"
			>
				<Link href="/signup">
					<a>Sign Up</a>
				</Link>
			</Button>
		</React.Fragment>
	)
}

export default AuthControl
