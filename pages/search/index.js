import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import ResultCard from '../../components/elements/result-card'
import AdvancedSearch from '../../components/elements/advanced-search'

const SearchPage = ({ books = [], movies = [] }) => {
	React.useEffect(() => {
		document.title = 'Search results'
	}, [])

	console.log(books)

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

export const getServerSideProps = async context => {
	const { query } = context

	if (query.type == 'book') {
		const res = await axios.get('http://localhost:3000/api/books', {
			params: query
		})

		return {
			props: {
				books: res.data.data
			}
		}
	}

	if (query.type == 'movie') {
		const res = await axios.get('http://localhost:3000/api/movies', {
			params: query
		})

		return {
			props: {
				movies: res.data.data
			}
		}
	}

	if (query.type == 'all') {
		const bookRes = await axios.get('http://localhost:3000/api/books', {
			params: query
		})

		const movieRes = await axios.get('http://localhost:3000/api/movies', {
			params: query
		})

		return {
			props: {
				books: bookRes.data.data,
				movies: movieRes.data.data
			}
		}
	}

	return {
		props: {
			notFound: true
		}
	}
}

export default SearchPage
