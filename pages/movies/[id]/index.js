import axios from 'axios'
import React from 'react'
import ResourceCard from '../../../components/elements/resource-card'
import SiteLayout from '../../../components/layouts/site-layout'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import { useAuthState } from '../../../hooks/useAuth'
import { useRouter } from 'next/router'
import { Popconfirm } from 'antd'

const MoviePage = ({ movie, reviews }) => {
	const { user } = useAuthState()
	const router = useRouter()

	const onEditClick = () => {
		router.push(`/movies/${movie._id}/edit`)
	}

	const deleteMovie = async () => {
		await axios.delete(`/api/movies/${movie._id}`)
		router.push(`/users/${user._id}/my-posts`)
	}

	return (
		<SiteLayout>
			<div className="proview-resource">
				<div className="proview-resource-actions">
					{user && user._id == movie.creator ? (
						<React.Fragment>
							<Tooltip title="Edit" placement="top">
								<IconButton aria-label="edit" onClick={onEditClick}>
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Popconfirm
								title="Are you sure to delete this movie?"
								onConfirm={deleteMovie}
								okText="Yes"
								cancelText="No"
							>
								<Tooltip title="Delete" placement="top">
									<IconButton aria-label="delete">
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							</Popconfirm>
						</React.Fragment>
					) : null}
				</div>

				<ResourceCard
					title={movie.name}
					year={movie.releasedYear}
					rating={Number(movie.rating)}
					img={movie.image}
					fields={[
						{
							content: `Directors: ${movie.directors}`,
							type: 'directors'
						},
						{ content: `Casts: ${movie.casts}`, type: 'casts' },
						{ content: `${movie.genres}`, type: 'genres' },
						{ content: `${movie.plot}`, type: 'plot' }
					]}
				/>

				<div className="proview-resource-reviews">
					<div className="proview-resource-reviews_title">Reviews</div>

					<div className="proview-resource-review"></div>
				</div>
			</div>
		</SiteLayout>
	)
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const movieRes = await axios.get(`http://localhost:3000/api/movies/${id}`)

	const reviewRes = await axios.get(`http://localhost:3000/api/reviews`, {
		params: {
			reviewOn: id
		}
	})

	const movie = movieRes.data.data
	const reviews = reviewRes.data.data

	return {
		props: {
			movie,
			reviews
		}
	}
}

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:3000/api/movies')

	const movies = res.data.data

	const paths = movies.map(movie => ({ params: { id: movie._id.toString() } }))

	return {
		paths,
		fallback: false
	}
}

export default MoviePage
