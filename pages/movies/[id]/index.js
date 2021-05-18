import axios from 'axios'
import React from 'react'
import ResourceCard from '../../../components/elements/resource-card'
import SiteLayout from '../../../components/layouts/site-layout'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { useAuthState } from '../../../hooks/useAuth'
import { useRouter } from 'next/router'
import { Popconfirm } from 'antd'
import ReviewForm from '../../../components/elements/review-form'
import ReviewCard from '../../../components/elements/review-card'

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

	const deleteReview = async (id, onModel, author, rating, reviewOn) => {
		await axios.delete(`/api/reviews/${id}`, {
			data: { onModel, author, rating, reviewOn }
		})
		router.reload()
	}

	const [reviewState, setReviewState] = React.useState({
		viewState: 'view',
		review: null
	})

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
						{ content: `Directors: ${movie.directors}`, type: 'directors' },
						{ content: `Casts: ${movie.casts}`, type: 'casts' },
						{ content: `${movie.genres}`, type: 'genres' },
						{ content: `${movie.plot}`, type: 'plot' }
					]}
				/>

				<div className="proview-resource-reviews">
					<div className="proview-resource-reviews_title">
						<span>Reviews</span>
						{user && reviews.every(review => review.author != user._id) ? (
							<Tooltip title="Add review" placement="top">
								<IconButton
									aria-label="add"
									onClick={() =>
										setReviewState({ ...reviewState, viewState: 'writeNew' })
									}
								>
									<AddIcon />
								</IconButton>
							</Tooltip>
						) : null}
					</div>

					{user && reviewState.viewState == 'writeNew' ? (
						<div className="proview-resource-reviews_new">
							<ReviewForm
								userId={user._id}
								model="Movie"
								modelId={movie._id}
								submitText="Post"
								fetchMethod={axios.post}
								onSubmit={() =>
									setReviewState({ ...reviewState, viewState: 'view' })
								}
								authRoute="reviews"
							/>
						</div>
					) : null}

					{user && reviewState.viewState == 'edit' ? (
						<div className="proview-resource-reviews_new">
							<ReviewForm
								initialValues={{
									title: reviewState.review.title,
									content: reviewState.review.content,
									rating: reviewState.review.rating
								}}
								userId={user._id}
								model="Movie"
								modelId={movie._id}
								submitText="Save"
								fetchMethod={axios.patch}
								onSubmit={() =>
									setReviewState({ review: null, viewState: 'view' })
								}
								authRoute={`reviews/${reviewState.review._id}`}
							/>
						</div>
					) : null}

					{reviewState.viewState == 'view'
						? reviews.map(review => (
								<React.Fragment>
									{user && review.author == user._id ? (
										<div className="proview-resource-reviews_buttons">
											<Tooltip title="Edit" placement="top">
												<IconButton
													aria-label="edit"
													onClick={() =>
														setReviewState({ review, viewState: 'edit' })
													}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>

											<Popconfirm
												title="Are you sure to delete this review?"
												onConfirm={() =>
													deleteReview(
														review._id,
														review.onModel,
														review.author,
														review.rating,
														review.reviewOn
													)
												}
												okText="Yes"
												cancelText="No"
											>
												<Tooltip title="Delete" placement="top">
													<IconButton aria-label="delete">
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											</Popconfirm>
										</div>
									) : null}

									<ReviewCard
										key={review._id}
										author={review.author}
										title={review.title}
										content={review.content}
										at={review.at}
										rating={review.rating}
										score={review.score}
									/>
								</React.Fragment>
						  ))
						: null}
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
