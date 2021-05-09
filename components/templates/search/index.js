import React from 'react'
import ResultCard from './result-card'

const SearchTemplate = () => {
	const fakeBooks = [
		{
			name: 'Eloquent JavaScript: A Modern Introduction to Programming',
			author: 'Marijn Haverbeke',
			rating: 4.5,
			publishYear: 2011
		},
		{
			name: "You Don't Know JS: Scope & Closures",
			author: 'Kyle Simpson',
			rating: 4.8,
			publishYear: 2014
		},
		{
			name: 'JavaScript: The Good Parts',
			author: 'Douglas Crockford',
			rating: 4.4,
			publishYear: 2008
		},
		{
			name:
				'Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript',
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
		<div className="proview-search">
			<div className="proview-search-title">Search results</div>

			<ResultCard />
		</div>
	)
}

export default SearchTemplate
