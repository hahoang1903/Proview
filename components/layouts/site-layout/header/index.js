import React from 'react'
import Link from 'next/link'
import { Row, Col, Dropdown, Menu } from 'antd'
import AuthControl from './auth-control'
import SearchBar from '../../../elements/search-bar'

const AppHeader = () => {
	const renderMenu = type => (
		<Menu>
			<Menu.Item key="suggest">
				<Link href={`/suggest/${type}`}>
					<a>Check our suggestion</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="new">
				<Link href={`/${type}s/new`}>
					<a>Create new</a>
				</Link>
			</Menu.Item>
			<Menu.Item key="search">
				<Link href={`/search?type=${type}`}>
					<a>Search for {type}s</a>
				</Link>
			</Menu.Item>
		</Menu>
	)

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

			<Col xs={0} md={12} className="proview-header-search-bar">
				<SearchBar verticalCenter={true} />
			</Col>

			<Col xs={0} md={10}>
				<div className="proview-header-right">
					<Dropdown
						overlay={renderMenu('book')}
						trigger={['click']}
						placement="bottomRight"
					>
						<div className="proview-header-right-item">Books</div>
					</Dropdown>

					<Dropdown
						overlay={renderMenu('movie')}
						trigger={['click']}
						placement="bottomRight"
					>
						<div className="proview-header-right-item">Movies</div>
					</Dropdown>

					<AuthControl />
				</div>
			</Col>
		</Row>
	)
}

export default AppHeader
