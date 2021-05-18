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

const BookPage = ({ book, reviews }) => {
	const { user } = useAuthState()
	const router = useRouter()

	const onEditClick = () => {
		router.push(`/books/${book._id}/edit`)
	}

	const deleteBook = async () => {
		await axios.delete(`/api/books/${book._id}`)
		router.push(`/users/${user._id}/my-posts`)
	}

	return (
		<SiteLayout>
			<div className="proview-resource">
				<div className="proview-resource-actions">
					{user && user._id == book.creator ? (
						<React.Fragment>
							<Tooltip title="Edit" placement="top">
								<IconButton aria-label="edit" onClick={onEditClick}>
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Popconfirm
								title="Are you sure to delete this book?"
								onConfirm={deleteBook}
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
					title={book.name}
					year={book.releasedYear}
					rating={Number(book.rating)}
					img={book.image}
					fields={[
						{ content: `Authors: ${book.authors}`, type: 'authors' },
						{ content: `${book.genres}`, type: 'genres' },
						{ content: `${book.plot}`, type: 'plot' }
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

	const bookRes = await axios.get(`http://localhost:3000/api/books/${id}`)

	const reviewRes = await axios.get(`http://localhost:3000/api/reviews`, {
		params: {
			reviewOn: id
		}
	})

	const book = bookRes.data.data
	const reviews = reviewRes.data.data

	return {
		props: {
			book,
			reviews
		}
	}
}

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:3000/api/books')

	const books = res.data.data

	const paths = books.map(book => ({ params: { id: book._id.toString() } }))

	return {
		paths,
		fallback: false
	}
}

export default BookPage
