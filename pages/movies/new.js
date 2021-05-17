import axios from 'axios'
import React from 'react'
import ResourceForm from '../../components/elements/resource-form'
import SiteLayout from '../../components/layouts/site-layout'

const NewMoviePage = () => {
	React.useEffect(() => {
		document.title = 'Create book'
	}, [])

	return (
		<SiteLayout>
			<div className="proview-new">
				<ResourceForm
					title="Create new movie"
					formFields={[
						{
							name: 'name',
							label: 'Movie name',
							rules: [
								{
									required: true,
									message: 'Please provide a movie name'
								}
							]
						},
						{
							name: 'directors',
							label: 'Movie directors',
							rules: [
								{
									required: true,
									message: 'Please provide movie directors'
								}
							]
						},
						{
							name: 'casts',
							label: 'Movie casts',
							rules: [
								{
									required: true,
									message: 'Please provide movie casts'
								}
							]
						},
						{
							name: 'genres',
							label: 'Movie genres',
							rules: [
								{
									required: true,
									message: 'Please provide movie genres'
								}
							]
						},
						{
							name: 'releasedYear',
							label: 'Movie released year',
							type: 'number',
							inputProps: {
								min: 1600
							},
							rules: [
								{
									required: true,
									message: 'Please provide movie released year'
								}
							]
						},
						{
							name: 'plot',
							label: 'Movie description',
							rules: [
								{
									required: true,
									message: 'Please provide a movie description'
								}
							]
						}
					]}
					submitText="Create"
					route="movies"
					fetchMethod={axios.post}
				/>
			</div>
		</SiteLayout>
	)
}

export default NewMoviePage
