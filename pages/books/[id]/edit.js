import axios from 'axios'
import React from 'react'
import SiteLayout from '../../../components/layouts/site-layout'
import ResourceForm from '../../../components/elements/resource-form'
import { useAuthState } from '../../../hooks/useAuth'
import { useRouter } from 'next/router'

const EditBookPage = ({ book }) => {
	const router = useRouter()
	const { user } = useAuthState()

	React.useEffect(() => {
		document.title = 'Edit book'

		if (!user) router.push('/login')
		else if (user._id != book.creator) router.push('/')
	}, [])

	return (
		<SiteLayout>
			<div className="proview-edit">
				<ResourceForm
					title="Edit book"
					initialValues={{
						name: book.name,
						authors: book.authors,
						genres: book.genres,
						releasedYear: book.releasedYear,
						plot: book.plot,
						image: book.image
					}}
					formFields={[
						{
							name: 'name',
							label: 'Book name',
							rules: [
								{
									required: true,
									message: 'Please provide a book name'
								}
							]
						},
						{
							name: 'authors',
							label: 'Book authors',
							rules: [
								{
									required: true,
									message: 'Please provide book authors'
								}
							]
						},
						{
							name: 'genres',
							label: 'Book genres',
							rules: [
								{
									required: true,
									message: 'Please provide book genres'
								}
							]
						},
						{
							name: 'releasedYear',
							label: 'Book released year',
							type: 'number',
							inputProps: {
								min: 1600
							},
							rules: [
								{
									required: true,
									message: 'Please provide book released year'
								}
							]
						},
						{
							name: 'plot',
							label: 'Book description',
							rules: [
								{
									required: true,
									message: 'Please provide a book description'
								}
							]
						}
					]}
					submitText="Save"
					route={`books/${book._id}`}
					fetchMethod={axios.patch}
				/>
			</div>
		</SiteLayout>
	)
}

export const getStaticProps = async context => {
	const {
		params: { id }
	} = context

	const bookRes = await axios.get(`http://localhost:3000/api/books/${id}`)
	const book = bookRes.data.data

	return {
		props: {
			book
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

export default EditBookPage
