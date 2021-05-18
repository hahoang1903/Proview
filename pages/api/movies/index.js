import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '../../../util/mongodb'
import Movie from '../../../models/movie'
import User from '../../../models/user'

cloudinary.config({
	cloud_name: 'hahoangcloud',
	api_key: '117721157213534',
	api_secret: 'avMVdw0psnIOBTRYbdalFkaGxWQ'
})

dbConnect()

export default async function handler(req, res) {
	const { method, query } = req

	switch (method) {
		case 'GET':
			const {
				name,
				directors,
				casts,
				genres,
				yearFrom,
				yearTo,
				ratingFrom,
				ratingTo,
				sortBy
			} = query

			let queryObj = {}

			if (name) {
				queryObj.name = new RegExp(name, 'i')
			}

			if (directors) {
				const directorsArr = directors.split(/[ ,]+/)
				queryObj.directors = { $in: directorsArr }
			}

			if (casts) {
				const castsArr = casts.split(/[ ,]+/)
				queryObj.casts = { $in: castsArr }
			}

			if (genres) {
				const genresArr = genres.split(/[ ,]+/)
				queryObj.genres = { $in: genresArr }
			}

			if (yearFrom) {
				queryObj.releasedYear = {
					...queryObj.releasedYear,
					$gte: Number(yearFrom)
				}
			}

			if (yearTo) {
				queryObj.releasedYear = {
					...queryObj.releasedYear,
					$lte: Number(yearTo)
				}
			}

			if (ratingFrom) {
				queryObj.rating = {
					...queryObj.rating,
					$gte: Number(ratingFrom)
				}
			}

			if (ratingTo) {
				queryObj.rating = {
					...queryObj.rating,
					$lte: Number(ratingTo)
				}
			}

			try {
				let movies
				switch (sortBy) {
					case 'rating':
						movies = await Movie.find(queryObj).sort({ rating: 1 })
						break
					case 'releasedYear':
						movies = await Movie.find(queryObj).sort({ releasedYear: 1 })
						break
					default:
						movies = await Movie.find(queryObj).sort({ name: 1 })
						break
				}

				return res.status(200).json({ success: true, data: movies })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}
		case 'POST':
			try {
				const { body } = req
				const image = await cloudinary.uploader.upload(body.image)

				const movie = await Movie.create({ ...body, image: image.secure_url })

				const user = await User.findById(body.creator)

				user.movies.push(movie)

				return res.status(201).json({ success: true, message: 'Movie created' })
			} catch (error) {
				return res.status(400).json({ success: false, error })
			}

		default:
			return res
				.status(405)
				.json({ success: false, message: "We don't support this method" })
	}
}
