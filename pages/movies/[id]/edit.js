import axios from 'axios'
import React from 'react'
import SiteLayout from '../../../components/layouts/site-layout'
import ResourceForm from '../../../components/elements/resource-form'
import { useAuthState } from '../../../hooks/useAuth'
import { useRouter } from 'next/router'

const EditMoviePage = ({ movie }) => {
	const router = useRouter()
	const { user } = useAuthState()

	React.useEffect(() => {
		document.title = 'Edit movie'

		if (!user) router.push('/login')
		else if (user._id != movie.creator) router.push('/')
	}, [])

	return (
		<SiteLayout>
			<div className="proview-edit">
				<ResourceForm
					title="Edit movie"
					initialValues={{
						name: movie.name,
						directors: movie.directors,
						casts: movie.casts,
						genres: movie.genres,
						releasedYear: movie.releasedYear,
						plot: movie.plot,
						image: movie.image
					}}
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
					submitText="Save"
					route={`movies/${movie._id}`}
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

	const movieRes = await axios.get(`http://localhost:3000/api/movies/${id}`)
	const movie = movieRes.data.data

	return {
		props: {
			movie
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

export default EditMoviePage
