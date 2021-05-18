import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LeftOutlined } from '@ant-design/icons'
import SiteLayout from '../../../components/layouts/site-layout'
import { useAuthState } from '../../../hooks/useAuth'
import ResultCard from '../../../components/elements/result-card'

const UserProfilePage = ({ user, token, books, movies }) => {
	const authState = useAuthState()
	const router = useRouter()

	React.useEffect(() => {
		document.title = 'Profile'
		if (token != authState.token) router.push('/login')
	}, [])

	return (
		<SiteLayout>
			<div className="proview-profile">
				<div className="proview-profile-tabs">
					<div className="proview-profile-tabs_tab">
						<Link href={`/users/${user._id}`}>
							<a>
								<LeftOutlined /> Back to Profile
							</a>
						</Link>
					</div>
				</div>

				<div className="proview-profile-section">
					<div className="proview-profile-section_title">My posts</div>

					<div className="proview-profile-section-subsection proview-profile-section-subsection--books">
						<div className="proview-profile-section-subsection_title">
							Books
						</div>
						{books.map(book => (
							<ResultCard
								key={book._id}
								name={book.name}
								img={book.image}
								rating={Number(book.rating)}
								fields={[
									{ content: `Authors: ${book.authors}`, type: 'authors' },
									{ content: `${book.genres}`, type: 'genres' },
									{ content: `${book.releasedYear}`, type: 'year' }
								]}
							/>
						))}

						{books.length == 0 ? (
							<div className="proview-profile-section-subsection_nf">
								No books found
							</div>
						) : null}
					</div>

					<div className="proview-profile-section-subsection proview-profile-section-subsection--movies">
						<div className="proview-profile-section-subsection_title">
							Movies
						</div>

						{movies.map(movie => (
							<ResultCard
								key={movie._id}
								name={movie.name}
								img={movie.image}
								rating={Number(movie.rating)}
								fields={[
									{
										content: `Directors: ${movie.directors}`,
										type: 'directors'
									},
									{ content: `Casts: ${movie.casts}`, type: 'casts' },
									{ content: `${movie.genres}`, type: 'genres' },
									{ content: `${movie.releasedYear}`, type: 'year' }
								]}
							/>
						))}

						{movies.length == 0 ? (
							<div className="proview-profile-section-subsection_nf">
								No movies found
							</div>
						) : null}
					</div>
				</div>
			</div>
		</SiteLayout>
	)
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const userRes = await axios.get(`http://localhost:3000/api/users/${id}`)

	const bookRes = await axios.get(`http://localhost:3000/api/books`, {
		params: {
			creator: id
		}
	})

	const movieRes = await axios.get(`http://localhost:3000/api/movies`, {
		params: {
			creator: id
		}
	})

	const { user, token } = userRes.data
	const books = bookRes.data.data
	const movies = movieRes.data.data

	return {
		props: {
			user,
			token,
			books,
			movies
		}
	}
}

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:3000/api/users')

	const users = res.data.data

	const paths = users.map(user => ({ params: { id: user._id.toString() } }))

	return {
		paths,
		fallback: false
	}
}

export default UserProfilePage
