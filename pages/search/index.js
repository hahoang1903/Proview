import React from 'react'
import SiteLayout from '../../components/layouts/site-layout'
import ResultCard from '../../components/elements/result-card'

const SearchPage = () => {
	React.useEffect(() => {
		document.title = 'Search results'
	})

	const fakeBooks = [
		{
			id: 'jsdfh1027346sjdhf',
			name: 'Eloquent JavaScript: A Modern Introduction to Programming',
			author: 'Marijn Haverbeke',
			rating: 4.5,
			publishYear: 2011
		},
		{
			id: '291038hrn09sadfh027',
			name: "You Don't Know JS: Scope & Closures",
			author: 'Kyle Simpson',
			rating: 4.8,
			publishYear: 2014
		},
		{
			id: '1283ujsdkjhf314df8',
			name: 'JavaScript: The Good Parts',
			author: 'Douglas Crockford',
			rating: 4.4,
			publishYear: 2008
		},
		{
			id: '2h3089fsdbf87ft27',
			name: 'Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript',
			author: 'David Herman',
			rating: 4,
			publishYear: 2012
		}
	]

	const fakeMovies = []

	const [state, setState] = React.useState(null)

	React.useEffect(() => {
		const timeout = setTimeout(() => setState(fakeBooks), 3000)

		return () => clearTimeout(timeout)
	}, [fakeBooks])

	return (
		<SiteLayout>
			<div className="proview-search">
				<div className="proview-search-title">Search results</div>

				<ResultCard />
			</div>
		</SiteLayout>
	)
}

export default SearchPage

// export async function getStaticProps(context) {
// 	const books = setTimeout(() => setState(fakeBooks), 3000)

// 	return {}
// }
