import React from 'react'
import SearchTemplate from '../../components/templates/search'
import SiteLayout from '../../components/layouts/site-layout'

const SearchPage = () => {
	React.useEffect(() => {
		document.title = 'Search results'
	})

	return (
		<SiteLayout>
			<SearchTemplate />
		</SiteLayout>
	)
}

export default SearchPage
