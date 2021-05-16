import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import ResultCard from '../../components/elements/result-card'
import AdvancedSearch from '../../components/elements/advanced-search'

const SearchPage = ({ books = [], movies = [] }) => {
	React.useEffect(() => {
		document.title = 'Search results'
	})

	return (
		<SiteLayout>
			<div className="proview-search">
				<div className="proview-search-section">
					<div className="proview-search-section_title">Advanced search</div>

					<AdvancedSearch
						formFields={[
							{
								name: 'name',
								size: { xs: 24, md: 18 },
								inputProps: {
									autoComplete: 'off'
								}
							},
							{
								type: 'select',
								name: 'type',
								label: 'Search type',
								size: { xs: 24, md: 6 },
								optionList: [
									{ value: 'all', name: 'All' },
									{ value: 'book', name: 'Book' },
									{ value: 'movie', name: 'Movie' }
								]
							},
							{
								name: 'genres',
								size: { xs: 24, md: 12 }
							},
							{
								name: 'rating',
								size: { xs: 24, md: 6 },
								type: 'number',
								inputProps: {
									min: 0,
									max: 5
								}
							},
							{
								name: 'releasedYear',
								label: 'Year',
								size: { xs: 24, md: 6 },
								type: 'number',
								inputProps: {
									min: 1600
								}
							},
							{
								name: 'authors',
								size: { xs: 24, md: 7 }
							},
							{
								size: { xs: 0, md: 3 }
							},
							{
								name: 'directors',
								size: { xs: 24, md: 7 }
							},
							{
								name: 'casts',
								size: { xs: 24, md: 7 }
							}
						]}
					/>
				</div>

				<div className="proview-search-section">
					<div className="proview-search-section_title">Search results</div>

					<ResultCard />
				</div>
			</div>
		</SiteLayout>
	)
}

export default SearchPage

export const getServerSideProps = async context => {
	const { query } = context

	if (query.type == 'book') {
		const books = await axios.get('http://localhost:3000/api/books', {
			params: query
		})

		return {
			props: {
				books: books.data
			}
		}
	}

	if (query.type == 'movie') {
		const movies = await axios.get('http://localhost:3000/api/movies', {
			params: query
		})

		return {
			props: {
				movies: movies.data
			}
		}
	}

	if (query.type == 'all') {
		const books = await axios.get('http://localhost:3000/api/books', {
			params: query
		})

		const movies = await axios.get('http://localhost:3000/api/movies', {
			params: query
		})

		return {
			props: {
				books: books.data,
				movies: movies.data
			}
		}
	}

	return {
		props: {
			notFound: true
		}
	}
}

// export async function getStaticProps(context) {
// const fakeBooks = [
// 	{
// 		id: 'jsdfh1027346sjdhf',
// 		image:
// 			'https://media1.popsugar-assets.com/files/thumbor/-Q9R5WHoEUikdqZWJpl0OL6fo7g/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/02/07/3/301/3019466/a7c409363d6d6d9a_harrynew_custom-1fa12c2215710024d4fb570714431f00ca671dc1-s6-c10/i/Harry-Potter-Sorcerer-Stone-USA-15th-Anniversary-Edition.jpg',
// 		name: 'Eloquent JavaScript: A Modern Introduction to Programming',
// 		author: 'Marijn Haverbeke',
//
// rating: 4.5,
// 		publishYear: 2011
// 	},
// 	{
// 		id: '291038hrn09sadfh027',
// 		image:
// 			'https://media1.popsugar-assets.com/files/thumbor/-Q9R5WHoEUikdqZWJpl0OL6fo7g/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/02/07/3/301/3019466/a7c409363d6d6d9a_harrynew_custom-1fa12c2215710024d4fb570714431f00ca671dc1-s6-c10/i/Harry-Potter-Sorcerer-Stone-USA-15th-Anniversary-Edition.jpg',
// 		name: "You Don't Know JS: Scope & Closures",
// 		author: 'Kyle Simpson',
// 		rating: 4.8,
// 		publishYear: 2014
// 	},
// 	{
// 		id: '1283ujsdkjhf314df8',
// 		image:
// 			'https://media1.popsugar-assets.com/files/thumbor/-Q9R5WHoEUikdqZWJpl0OL6fo7g/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/02/07/3/301/3019466/a7c409363d6d6d9a_harrynew_custom-1fa12c2215710024d4fb570714431f00ca671dc1-s6-c10/i/Harry-Potter-Sorcerer-Stone-USA-15th-Anniversary-Edition.jpg',
// 		name: 'JavaScript: The Good Parts',
// 		author: 'Douglas Crockford',
// 		rating: 4.4,
// 		publishYear: 2008
// 	},
// 	{
// 		id: '2h3089fsdbf87ft27',
// 		image:
// 			'https://media1.popsugar-assets.com/files/thumbor/-Q9R5WHoEUikdqZWJpl0OL6fo7g/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/02/07/3/301/3019466/a7c409363d6d6d9a_harrynew_custom-1fa12c2215710024d4fb570714431f00ca671dc1-s6-c10/i/Harry-Potter-Sorcerer-Stone-USA-15th-Anniversary-Edition.jpg',
// 		name: 'Effective JavaScript: 68 Specific Ways to Harness the Power of JavaScript',
// 		author: 'David Herman',
// 		rating: 4,
// 		publishYear: 2012
// 	}
// ]

// const fakeMovies = []

// 	const books = setTimeout(() => setState(fakeBooks), 3000)

// 	return {}
// }
