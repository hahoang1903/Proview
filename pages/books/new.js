import axios from 'axios'
import React from 'react'
import ResourceForm from '../../components/elements/resource-form'
import SiteLayout from '../../components/layouts/site-layout'

const NewBookPage = () => {
	React.useEffect(() => {
		document.title = 'Create book'
	}, [])

	return (
		<SiteLayout>
			<div className="proview-books">
				<ResourceForm
					title="Create new book"
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
					submitText="Create"
					route="books"
					fetchMethod={axios.post}
				/>
			</div>
		</SiteLayout>
	)
}

export default NewBookPage
