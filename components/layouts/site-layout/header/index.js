import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd'
import AuthControl from './auth-control'
import SearchBar from '../../../elements/search-bar'

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
				<SearchBar verticalCenter={true} />
			</Col>

			<Col xs={0} md={8} className="proview-header-auth">
				<AuthControl />
			</Col>
		</Row>
	)
}

export default AppHeader
