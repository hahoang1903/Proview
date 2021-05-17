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
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const movies = await Movie.find({})

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
