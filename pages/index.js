import React from 'react'
import HomeTemplate from '../components/templates/home'
import SiteLayout from '../components/layouts/site-layout'

const HomePage = () => {
	React.useEffect(() => {
		document.title = 'Proview - Trusted rating site'
	})

	return (
		<SiteLayout>
			<HomeTemplate />
		</SiteLayout>
	)
}

export default HomePage
