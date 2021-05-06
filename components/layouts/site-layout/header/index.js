import React from 'react'
import Link from 'next/link'

import { Row, Col, Input } from 'antd'
import Button from '@material-ui/core/Button'

const AppHeader = () => {
	return (
		<Row>
			<Col xs={0} md={2}>
				<div className="proview-header-logo">
					<Link href="/">
						<a>P</a>
					</Link>
				</div>
			</Col>

			<Col xs={20} md={0}>
				<div className="proview-header-logo proview-header-logo--center">
					<Link href="/">
						<a>P</a>
					</Link>
				</div>
			</Col>

			<Col xs={0} md={14} className="proview-header-search-bar">
				<Input.Search
					className="proview-header-search-bar_input"
					placeholder="Search for anything"
				/>
			</Col>

			<Col xs={0} md={8} className="proview-header-buttons">
				<Button
					variant="outlined"
					className="proview-header-buttons_button proview-header-buttons_button--outlined"
				>
					<Link href="/login">
						<a>Log in</a>
					</Link>
				</Button>

				<Button
					variant="contained"
					className="proview-header-buttons_button proview-header-buttons_button--contained"
				>
					<Link href="/signup">
						<a>Sign Up</a>
					</Link>
				</Button>

				<div style={{ clear: 'both' }}></div>
			</Col>
		</Row>
	)
}

export default AppHeader
