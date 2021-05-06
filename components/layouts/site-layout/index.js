import React from 'react'
import { Layout } from 'antd'
import AppHeader from './header'
import AppSidebar from './sidebar'

const SiteLayout = props => {
	const { Header, Footer, Content } = Layout

	return (
		<Layout>
			<Header className="proview-header">
				<AppHeader />
			</Header>
			<Content>{props.children}</Content>
			<Footer></Footer>
		</Layout>
	)
}

export default SiteLayout

// export const getLayout = page => <SiteLayout>{page}</SiteLayout>
