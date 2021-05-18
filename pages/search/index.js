import React from 'react'
import axios from 'axios'
import SiteLayout from '../../components/layouts/site-layout'
import ResultCard from '../../components/elements/result-card'
import AdvancedSearch from '../../components/elements/advanced-search'

const SearchPage = ({ books = [], movies = [] }) => {
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
					/>
				</div>

				<div className="proview-search-section">
					<div className="proview-search-section_title">Search results</div>

					<div className="proview-search-section-subsection proview-search-section-subsection--books">
						<div className="proview-search-section-subsection_title">Books</div>
						{books.map(book => (
							<ResultCard
								id={book._id}
								type="book"
								key={book._id}
								name={book.name}
								year={book.releasedYear}
								img={book.image}
								rating={Number(book.rating)}
								fields={[
									{ content: `Authors: ${book.authors}`, type: 'authors' },
									{ content: `${book.genres}`, type: 'genres' }
								]}
							/>
						))}

						{books.length == 0 ? (
							<div className="proview-search-section-subsection_nf">
								No books found
							</div>
						) : null}
					</div>

					<div className="proview-search-section-subsection proview-search-section-subsection--movies">
						<div className="proview-search-section-subsection_title">
							Movies
						</div>

						{movies.map(movie => (
							<ResultCard
								id={movie._id}
								type="movie"
								key={movie._id}
								name={movie.name}
								year={movie.releasedYear}
								img={movie.image}
								rating={Number(movie.rating)}
								fields={[
									{
										content: `Directors: ${movie.directors}`,
										type: 'directors'
									},
									{ content: `Casts: ${movie.casts}`, type: 'casts' },
									{ content: `${movie.genres}`, type: 'genres' }
								]}
							/>
						))}

						{movies.length == 0 ? (
							<div className="proview-search-section-subsection_nf">
								No movies found
							</div>
						) : null}
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
