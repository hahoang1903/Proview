import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import ResultCard from '../../components/elements/result-card'
import AdvancedSearch from '../../components/elements/advanced-search'

const SearchPage = ({ books = [], movies = [] }) => {
	const [state, setState] = React.useState({
		books,
		movies
	})

	React.useEffect(() => {
		document.title = 'Search results'
	}, [])

	return (
		<SiteLayout>
			<div className="proview-search">
				<div className="proview-search-section">
					<div className="proview-search-section_title">Advanced search</div>

					<AdvancedSearch
						formFields={[
							{
								name: 'name',
								size: { xs: 24, md: 16 },
								inputProps: {
									autoComplete: 'off'
								}
							},
							{
								type: 'select',
								name: 'type',
								label: 'Search type',
								size: { xs: 24, md: 4 },
								optionList: [
									{ value: 'all', name: 'All' },
									{ value: 'book', name: 'Book' },
									{ value: 'movie', name: 'Movie' }
								]
							},
							{
								type: 'select',
								name: 'sortBy',
								label: 'Sort by',
								size: { xs: 24, md: 4 },
								optionList: [
									{ value: 'name', name: 'Name' },
									{ value: 'rating', name: 'Rating' },
									{ value: 'releasedYear', name: 'Released year' }
								]
							},
							{
								name: 'genres',
								size: { xs: 24, md: 7 }
							},
							{
								name: 'ratingFrom',
								label: 'Rating from',
								size: { xs: 24, md: 5 },
								type: 'number',
								inputProps: {
									min: 0,
									max: 5
								}
							},
							{
								name: 'ratingTo',
								label: 'Rating to',
								size: { xs: 24, md: 4 },
								type: 'number',
								inputProps: {
									min: 0,
									max: 5
								}
							},
							{
								name: 'yearFrom',
								label: 'Year From',
								size: { xs: 24, md: 4 },
								type: 'number',
								inputProps: {
									min: 1600
								}
							},
							{
								name: 'yearTo',
								label: 'Year To',
								size: { xs: 24, md: 4 },
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
						onFinished={setState}
					/>
				</div>

				<div className="proview-search-section">
					<div className="proview-search-section_title">Search results</div>

					<div className="proview-search-section-subsection proview-search-section-subsection--books">
						<div className="proview-search-section-subsection_title">Books</div>
						{state.books.map(book => (
							<ResultCard key={book._id} name={book.name} img={book.image} />
						))}
					</div>

					<div className="proview-search-section-subsection proview-search-section-subsection--movies">
						<div className="proview-search-section-subsection_title">
							Movies
						</div>

						{state.movies.map(movie => (
							<ResultCard key={movie._id} name={movie.name} img={movie.image} />
						))}
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}

export const getServerSideProps = async context => {
	const { query } = context

	const type = query.type ?? 'all'

	if (type == 'book') {
		const res = await axios.get('http://localhost:3000/api/books', {
			params: query
		})

		return {
			props: {
				books: res.data.data
			}
		}
	}

	if (type == 'movie') {
		const res = await axios.get('http://localhost:3000/api/movies', {
			params: query
		})

		return {
			props: {
				movies: res.data.data
			}
		}
	}

	if (type == 'all') {
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
